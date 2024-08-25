import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import exercises from '@/testData/exercises';
import workouts from '@/testData/workouts';
import completedExercises from '@/testData/completedExercises';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import WorkoutStart from './WorkoutStart';
import Workouts from '../Workouts';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const workout = workouts[0];
const exercisesData = [exercises[7], exercises[2]];
const completedExercisesData = [completedExercises[3], completedExercises[5]];

exercisesData.forEach((exercise, index) => {
    exercise.completedExercise = completedExercisesData[index];
});

function mockPostCompletedExercise(index: number) {
    mock.onPost(
        `${import.meta.env.VITE_SERVER_URI}/api/exercises/completed-exercise`,
        completedExercisesData[index],
    ).reply(200, {
        meesage: 'Completed exercise saved successfully',
    });
}

function renderWorkoutStart() {
    render(
        <MemoryRouter
            initialEntries={[
                {
                    pathname: `/workout/${workout._id}/start`,
                    state: { exercises: exercisesData },
                },
            ]}
        >
            <Routes>
                <Route path="/workouts" element={<Workouts />} />

                <Route path="/workout/:id/start" element={<WorkoutStart />} />
            </Routes>
        </MemoryRouter>,
    );
}

describe('WorkoutStart', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    describe('when the WorkoutStart is rendered', async () => {
        it('make sure it is rendered and it works properly', async () => {
            renderWorkoutStart();
            expect(
                screen.getByText(exercisesData[0].instructions[0]),
            ).toBeInTheDocument();
        });
    });
    describe('when the cancel workout button is pressed', async () => {
        it('should redirect to the workout page', async () => {
            mock.onGet(`${import.meta.env.VITE_SERVER_URI}/api/workouts`).reply(
                200,
                { workouts: workouts },
            );

            renderWorkoutStart();
            const buttons = screen.getAllByRole('button');
            fireEvent.click(buttons[0]);
            expect(screen.getByText('Workouts')).toBeInTheDocument();
        });
    });
    describe('when the workout is being done', async () => {
        it('should show the pages correctly', async () => {
            mockPostCompletedExercise(0);
            renderWorkoutStart();
            let buttons = screen.getAllByRole('button');
            fireEvent.click(buttons[1]);
            expect(
                screen.getByText('GET READY FOR THE NEXT EXERCISE'),
            ).toBeInTheDocument();

            const button = screen.getByRole('button');
            fireEvent.click(button);

            vi.advanceTimersByTime(1000);

            expect(
                screen.getByText(exercisesData[1].instructions[0]),
            ).toBeInTheDocument();

            for (let i = 0; i < 3; i++) {
                buttons = screen.getAllByRole('button');
                fireEvent.click(buttons[1]);
                vi.advanceTimersByTime(1000);

                expect(screen.getByText('TAKE A REST')).toBeInTheDocument();

                expect(screen.getByText('0:11')).toBeInTheDocument();

                buttons = screen.getAllByRole('button');
                fireEvent.click(buttons[0]);
            }

            mockPostCompletedExercise(1);
            buttons = screen.getAllByRole('button');
            fireEvent.click(buttons[1]);
            vi.advanceTimersByTime(1000);

            expect(screen.getByText("THAT'S IT!")).toBeInTheDocument();

            buttons = screen.getAllByRole('button');
            fireEvent.click(buttons[0]);
            vi.advanceTimersByTime(1000);
            expect(screen.getByText('Workouts')).toBeInTheDocument();
        });
    });
});
