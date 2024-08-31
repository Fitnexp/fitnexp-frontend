import { expect, describe, it } from 'vitest';
import {
    render,
    screen,
    waitFor,
    act,
    fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Workout from './Workouts';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import workouts from '@/testData/workouts';

const mock = new MockAdapter(axios);

function renderWorkout() {
    render(
        <BrowserRouter>
            <Workout />
        </BrowserRouter>,
    );
}

describe('Workouts', () => {
    describe('when the Workout is rendered', async () => {
        it('make sure it is rendered and it works properly', async () => {
            mock.onGet(`${import.meta.env.VITE_SERVER_URI}/api/workouts`).reply(
                200,
                { workouts: workouts },
            );
            renderWorkout();
            expect(screen);

            for (const workout of workouts) {
                await waitFor(
                    () => {
                        expect(screen.getAllByText(workout.name).length).toBe(
                            2,
                        );
                    },
                    { timeout: 5000 },
                );
            }

            const searchBar = screen.getByPlaceholderText('Core Strength');
            expect(searchBar).toBeInTheDocument();

            act(() => {
                fireEvent.change(searchBar, { target: { value: 'Sho' } });
            });

            await waitFor(
                () => {
                    expect(screen.getAllByText('Shoulders Sunday').length).toBe(
                        2,
                    );
                    expect(
                        screen.queryByText('Core Strength Beginner Workout'),
                    ).toBeNull();
                },
                { timeout: 5000 },
            );

            act(() => {
                fireEvent.change(searchBar, { target: { value: '' } });
            });

            await waitFor(
                () => {
                    for (const workout of workouts) {
                        expect(screen.getAllByText(workout.name).length).toBe(
                            2,
                        );
                    }
                },
                { timeout: 5000 },
            );

            let button = screen.getByText('Add Workout');
            act(() => {
                fireEvent.click(button);
            });
            waitFor(() => {
                expect(
                    screen.getByText('Description (Optional)'),
                ).toBeInTheDocument();
            });

            mock.onPost(
                `${import.meta.env.VITE_SERVER_URI}/api/workouts`,
            ).reply(400, {
                errors: {
                    name: 'Name must be a string',
                },
            });

            button = screen.getByText('Create');
            act(() => {
                fireEvent.click(button);
            });
            waitFor(() => {
                expect(
                    screen.getByText('Email is required'),
                ).toBeInTheDocument();
            });

            const nameInput = screen.getAllByLabelText('Name');
            act(() => {
                fireEvent.change(nameInput[0], {
                    target: { value: 'Test Workout' },
                });
            });

            mock.onPost(
                `${import.meta.env.VITE_SERVER_URI}/api/workouts`,
            ).reply(200);

            button = screen.getByText('Create');
            act(() => {
                fireEvent.click(button);
            });
        });
    });
});
