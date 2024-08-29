import { expect, describe, it } from 'vitest';
import {
    render,
    screen,
    waitFor,
    act,
    fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Exercises from './Exercises';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import exercises from '@/testData/exercises';

const mock = new MockAdapter(axios);

function renderExercise() {
    render(
        <BrowserRouter>
            <Exercises />
        </BrowserRouter>,
    );
}
describe('Exercises', () => {
    describe('when the Exercises is rendered', async () => {
        it('make sure it is rendered and it works properly', async () => {
            mock.onGet(
                `${import.meta.env.VITE_SERVER_URI}/api/exercises`,
            ).reply(200, { exercises: exercises });
            renderExercise();
            expect(screen);

            await waitFor(
                () => {
                    for (const exercise of exercises) {
                        expect(
                            screen.getByText(exercise.name),
                        ).toBeInTheDocument();
                    }
                },
                { timeout: 5000 },
            );

            const searchBar = screen.getByPlaceholderText('Push Up');
            expect(searchBar).toBeInTheDocument();

            act(() => {
                fireEvent.change(searchBar, { target: { value: 'Ham' } });
            });

            await waitFor(
                () => {
                    expect(screen.getAllByText('beginner')).toHaveLength(1);
                },
                { timeout: 5000 },
            );

            act(() => {
                fireEvent.change(searchBar, { target: { value: '' } });
            });

            await waitFor(
                () => {
                    for (const exercise of exercises) {
                        expect(
                            screen.getByText(exercise.name),
                        ).toBeInTheDocument();
                    }
                },
                { timeout: 5000 },
            );

            await waitFor(
                () => {
                    const button = screen.getByText('Ab Roller');
                    fireEvent.click(button);
                },
                { timeout: 5000 },
            );

            expect(window.location.pathname).toBe('/exercise/5');
        });
    });
});
