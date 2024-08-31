import { describe, it, expect } from 'vitest';
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Workout from './Workout';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import workouts from '@/testData/workouts';
import completedExercises from '@/testData/completedExercises';
import exercises from '@/testData/exercises';

const mock = new MockAdapter(axios);

const workout = workouts[0];

function renderWorkout() {
    render(
        <MemoryRouter
            initialEntries={[
                { pathname: `/workout/${workout._id}`, state: { workout } },
            ]}
        >
            <Routes>
                <Route path="/workout/:id" element={<Workout />} />
            </Routes>
        </MemoryRouter>,
    );
}
describe('Workout', () => {
    describe('when the Workout is rendered', async () => {
        it('make sure it is rendered and it works properly', async () => {
            mock.onGet(
                `${import.meta.env.VITE_SERVER_URI}/api/workouts/${workouts[0]._id}`,
            ).reply(200, {
                completedExercises: [
                    [completedExercises[1]],
                    [completedExercises[2]],
                    [completedExercises[3]],
                ],
            });

            mock.onGet(
                `${import.meta.env.VITE_SERVER_URI}/api/exercises`,
            ).reply(200, { exercises: exercises });

            mock.onDelete(
                `${import.meta.env.VITE_SERVER_URI}/api/workouts/${workouts[0]._id}/exercises/0`,
            ).reply(200);

            mock.onPost(
                `${import.meta.env.VITE_SERVER_URI}/api/workouts/${workout._id}/exercises`,
                exercises[0],
            ).reply(200);

            renderWorkout();
            for (const exercises in workout.exercises) {
                expect(
                    screen.getByText(workout.exercises[exercises].name),
                ).toBeInTheDocument();
            }

            await waitFor(
                () => {
                    const table = screen.getAllByRole('table');
                    expect(table.length).toBe(3);
                },
                {
                    timeout: 5000,
                },
            );

            expect(screen.getAllByRole('button').length).toBe(8);
            fireEvent.click(screen.getAllByRole('button')[2]);
            expect(screen.getByText('Add Set')).toBeInTheDocument();

            const currentRows = screen.getAllByRole('row');

            fireEvent.click(screen.getAllByRole('button')[3]);
            expect(screen.getAllByRole('row').length).toBe(
                currentRows.length - 1,
            );

            fireEvent.click(screen.getAllByRole('button')[3]);
            expect(screen.getAllByRole('row').length).toBe(
                currentRows.length - 1,
            );

            fireEvent.click(screen.getAllByRole('button')[1]);
            expect(screen.getAllByRole('img').length).toBe(3);

            fireEvent.click(screen.getAllByRole('button')[4]);
            expect(screen.getAllByRole('row').length).toBe(currentRows.length);

            let addExerciseButton = screen.getByText('Add Exercise');
            act(() => {
                fireEvent.click(addExerciseButton);
            });

            expect(screen.getByText('Choose an exercise')).toBeInTheDocument();
            await waitFor(() => {
                const exercise = screen.getByText('3/4 Sit-Up');
                act(() => {
                    fireEvent.click(exercise);
                });
            });

            addExerciseButton = screen.getByText('Add Exercise');
            act(() => {
                fireEvent.click(addExerciseButton);
            });

            const searchBar = screen.getByPlaceholderText('Push Up'); // NOSONAR
            expect(searchBar).toBeInTheDocument(); // NOSONAR

            act(() => {
                fireEvent.change(searchBar, { target: { value: 'Ham' } });
            }); // NOSONAR

            await waitFor(
                () => {
                    expect(screen.getAllByText('beginner')).toHaveLength(1);
                },
                { timeout: 5000 },
            ); // NOSONAR

            act(() => {
                fireEvent.change(searchBar, { target: { value: '' } });
            }); // NOSONAR

            await waitFor(
                () => {
                    for (const exercise of exercises) {
                        expect(
                            screen.getByText(exercise.name),
                        ).toBeInTheDocument();
                    }
                },
                { timeout: 5000 },
            ); // NOSONAR

            const backButton = screen.getByText('Go Back');
            act(() => {
                fireEvent.click(backButton);
            });

            const startButton = screen.getAllByRole('button');
            fireEvent.click(startButton[0]);
        });
    });
});
