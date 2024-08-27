class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserver;
import { expect, describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import exercises from '@/testData/exercises';
import completedExercises from '@/testData/completedExercises';
import Profile from './Profile';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

const user = {
    username: 'Alberto',
    exercisesDone: 7,
    weightLifted: 210,
    repetitionsDone: 230,
};

const exercisesTest = {
    exercises: [exercises[5], exercises[5], exercises[6]],
};

const completedExercisesTest = {
    completedExercises: [
        completedExercises[0],
        completedExercises[1],
        completedExercises[2],
    ],
};

function renderStats() {
    render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>,
    );
}

describe('Profile', () => {
    mock.onGet(`${import.meta.env.VITE_SERVER_URI}/api/logged-user`).reply(
        200,
        user,
    );
    mock.onGet(
        `${import.meta.env.VITE_SERVER_URI}/api/exercises/completed-exercises`,
    ).reply(200, completedExercisesTest);
    mock.onPost(`${import.meta.env.VITE_SERVER_URI}/api/exercises/names`, {
        names: ['Ab Roller', 'Ab Roller', 'Alternating Cable Shoulder Press'],
    }).reply(200, exercisesTest);

    describe('when the Profile is rendered', async () => {
        it('make sure it is rendered and works as expected', async () => {
            renderStats();
            await waitFor(() => {
                expect(screen.getByText(user.exercisesDone)).toBeTruthy();
            });
            expect(screen.getByText(user.repetitionsDone)).toBeTruthy();
            expect(screen.getByText(user.weightLifted)).toBeTruthy();

            await waitFor(() => {
                expect(screen.getByText('NO EXERCISES FOUND')).toBeTruthy();
            });

            async function goToJune() {
                try {
                    await waitFor(
                        () => {
                            expect(
                                screen.getByText('June 2024'),
                            ).toBeInTheDocument();
                        },
                        { timeout: 10 },
                    );
                } catch (error) {
                    const button = screen.getByRole('button', {
                        name: 'Go to previous month',
                    });
                    fireEvent.click(button);
                    await goToJune();
                }
            }

            await goToJune();

            const buttons = screen.getAllByRole('gridcell', { name: '27' });
            fireEvent.click(buttons[1]);

            expect('Ab Rolldaadaer').toBeTruthy();

            fireEvent.click(buttons[1]);

            expect('PICK A DATE').toBeTruthy();
        });
    });
});
