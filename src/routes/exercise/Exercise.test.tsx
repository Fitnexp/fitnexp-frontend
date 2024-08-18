import { expect, describe, it } from 'vitest';
import {
    render,
    screen,
    waitFor,
    act,
    fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Exercise from './Exercise';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

const exercises = [
    {
        name: '3/4 Sit-Up',
        force: 'pull',
        level: 'beginner',
        mechanic: 'compound',
        equipment: 'body only',
        primaryMuscles: ['abdominals'],
        secondaryMuscles: [],
        instructions: [
            'Lie down on the floor and secure your feet. Your legs should be bent at the knees.',
            'Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.',
            'Flex your hips and spine to raise your torso toward your knees.',
            'At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down.',
            'Repeat for the recommended amount of repetitions.',
        ],
        category: 'strength',
        photo: 'test',
    },
    {
        name: '90/90 Hamstring',
        force: 'push',
        level: 'beginner',
        mechanic: null,
        equipment: 'body only',
        primaryMuscles: ['hamstrings'],
        secondaryMuscles: ['calves'],
        instructions: [
            'Lie on your back, with one leg extended straight out.',
            'With the other leg, bend the hip and knee to 90 degrees. You may brace your leg with your hands if necessary. This will be your starting position.',
            'Extend your leg straight into the air, pausing briefly at the top. Return the leg to the starting position.',
            'Repeat for 10-20 repetitions, and then switch to the other leg.',
        ],
        category: 'stretching',
        photo: 'test',
    },
    {
        name: 'Ab Crunch Machine',
        force: 'pull',
        level: 'intermediate',
        mechanic: 'isolation',
        equipment: 'machine',
        primaryMuscles: ['abdominals'],
        secondaryMuscles: [],
        instructions: [
            'Select a light resistance and sit down on the ab machine placing your feet under the pads provided and grabbing the top handles. Your arms should be bent at a 90 degree angle as you rest the triceps on the pads provided. This will be your starting position.',
            'At the same time, begin to lift the legs up as you crunch your upper torso. Breathe out as you perform this movement. Tip: Be sure to use a slow and controlled motion. Concentrate on using your abs to move the weight while relaxing your legs and feet.',
            'After a second pause, slowly return to the starting position as you breathe in.',
            'Repeat the movement for the prescribed amount of repetitions.',
        ],
        category: 'strength',
        photo: 'test',
    },
];

function renderExercise() {
    render(
        <BrowserRouter>
            <Exercise />
        </BrowserRouter>,
    );
}
describe('Exercise', () => {
    describe('when the Exercise is rendered', async () => {
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
        });
    });
});
