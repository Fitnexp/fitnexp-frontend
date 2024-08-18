import { expect, describe, it } from 'vitest';
import {
    render,
    screen,
    waitFor,
    act,
    fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Workout from './Workout';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

const workouts = [
    {
        username: 'Alberto',
        name: 'Shoulders Sunday',
        description: 'Shoulder workout for Sunday',
        exercises: [
            {
                name: 'Ab Roller',
                force: 'pull',
                level: 'intermediate',
                mechanic: 'compound',
                equipment: 'other',
                primaryMuscles: ['abdominals'],
                secondaryMuscles: ['shoulders'],
                instructions: [
                    'Hold the Ab Roller with both hands and kneel on the floor.',
                    'Now place the ab roller on the floor in front of you so that you are on all your hands and knees (as in a kneeling push up position). This will be your starting position.',
                    'Slowly roll the ab roller straight forward, stretching your body into a straight position. Tip: Go down as far as you can without touching the floor with your body. Breathe in during this portion of the movement.',
                    'After a pause at the stretched position, start pulling yourself back to the starting position as you breathe out. Tip: Go slowly and keep your abs tight at all times.',
                ],
                category: 'strength',
                photo: '',
            },
            {
                name: 'Alternating Cable Shoulder Press',
                force: 'push',
                level: 'beginner',
                mechanic: 'compound',
                equipment: 'cable',
                primaryMuscles: ['shoulders'],
                secondaryMuscles: ['triceps'],
                instructions: [
                    'Move the cables to the bottom of the tower and select an appropriate weight.',
                    'Grasp the cables and hold them at shoulder height, palms facing forward. This will be your starting position.',
                    'Keeping your head and chest up, extend through the elbow to press one side directly over head.',
                    'After pausing at the top, return to the starting position and repeat on the opposite side.',
                ],
                category: 'strength',
                photo: '',
            },
            {
                name: 'Alternating Kettlebell Press',
                force: 'push',
                level: 'intermediate',
                mechanic: 'compound',
                equipment: 'kettlebells',
                primaryMuscles: ['shoulders'],
                secondaryMuscles: ['triceps'],
                instructions: [
                    'Clean two kettlebells to your shoulders. Clean the kettlebells to your shoulders by extending through the legs and hips as you pull the kettlebells towards your shoulders. Rotate your wrists as you do so.',
                    'Press one directly overhead by extending through the elbow, turning it so the palm faces forward while holding the other kettlebell stationary .',
                    'Lower the pressed kettlebell to the starting position and immediately press with your other arm.',
                ],
                category: 'strength',
                photo: '',
            },
        ],
    },
    {
        username: 'Alberto',
        name: 'Core Strength Beginner Workout',
        description:
            'A beginner-friendly workout to strengthen the core muscles.',
        exercises: [
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
                photo: '',
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
                photo: '',
            },
            {
                name: 'Air Bike',
                force: 'pull',
                level: 'beginner',
                mechanic: 'compound',
                equipment: 'body only',
                primaryMuscles: ['abdominals'],
                secondaryMuscles: [],
                instructions: [
                    'Lie flat on the floor with your lower back pressed to the ground. For this exercise, you will need to put your hands beside your head. Be careful however to not strain with the neck as you perform it. Now lift your shoulders into the crunch position.',
                    'Bring knees up to where they are perpendicular to the floor, with your lower legs parallel to the floor. This will be your starting position.',
                    'Now simultaneously, slowly go through a cycle pedal motion kicking forward with the right leg and bringing in the knee of the left leg. Bring your right elbow close to your left knee by crunching to the side, as you breathe out.',
                    'Go back to the initial position as you breathe in.',
                    'Crunch to the opposite side as you cycle your legs and bring closer your left elbow to your right knee and exhale.',
                    'Continue alternating in this manner until all of the recommended repetitions for each side have been completed.',
                ],
                category: 'strength',
                photo: '',
            },
            {
                name: 'Alternate Heel Touchers',
                force: 'pull',
                level: 'beginner',
                mechanic: 'isolation',
                equipment: 'body only',
                primaryMuscles: ['abdominals'],
                secondaryMuscles: [],
                instructions: [
                    'Lie on the floor with the knees bent and the feet on the floor around 18-24 inches apart. Your arms should be extended by your side. This will be your starting position.',
                    'Crunch over your torso forward and up about 3-4 inches to the right side and touch your right heel as you hold the contraction for a second. Exhale while performing this movement.',
                    'Now go back slowly to the starting position as you inhale.',
                    'Now crunch over your torso forward and up around 3-4 inches to the left side and touch your left heel as you hold the contraction for a second. Exhale while performing this movement and then go back to the starting position as you inhale. Now that both heels have been touched, that is considered 1 repetition.',
                    'Continue alternating sides in this manner until all prescribed repetitions are done.',
                ],
                category: 'strength',
                photo: '',
            },
        ],
    },
];

function renderWorkout() {
    render(
        <BrowserRouter>
            <Workout />
        </BrowserRouter>,
    );
}
describe('WorkoutCard', () => {
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
        });
    });
});
