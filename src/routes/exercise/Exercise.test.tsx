import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Exercise from './Exercise';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import completedExercises from '@/testData/completedExercises';
import exercises from '@/testData/exercises';

const mock = new MockAdapter(axios);

const exercise = exercises[5];

function renderExercise() {
    render(
        <MemoryRouter
            initialEntries={[
                { pathname: `/exercise/${exercise._id}`, state: { exercise } },
            ]}
        >
            <Routes>
                <Route path="/exercise/:id" element={<Exercise />} />
            </Routes>
        </MemoryRouter>,
    );
}

describe('Exercise', () => {
    beforeAll(() => {
        global.ResizeObserver = class {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    });

    describe('when the Exercise is rendered', async () => {
        it('make sure it is rendered and it works properly', async () => {
            mock.onGet(
                `${import.meta.env.VITE_SERVER_URI}/api/exercises/completed-exercises`,
            ).reply(200, {
                completedExercises: [
                    completedExercises[0],
                    completedExercises[1],
                ],
            });

            renderExercise();

            expect(screen.getByText(exercise.name)).toBeInTheDocument();
            await waitFor(() => {
                expect(screen.getByText('Greatest Weight')).toBeInTheDocument();
                expect(
                    screen.getByText(
                        completedExercises[0].greatest_weight + ' Kg',
                    ),
                ).toBeInTheDocument();
            });
        });

        it('if it have not been done before, it should display a message', async () => {
            mock.onGet(
                `${import.meta.env.VITE_SERVER_URI}/api/exercises/completed-exercises`,
            ).reply(200, {
                completedExercises: [],
            });

            renderExercise();

            await waitFor(() => {
                expect(
                    screen.getByText('NO DATA ABOUT THIS EXERCISE'),
                ).toBeInTheDocument();
            });
        });
    });
});
