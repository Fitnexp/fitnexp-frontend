import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WorkoutCard from './WorkoutCard';
import IWorkout from '../../interfaces/workoutInterface';

const workout: IWorkout = {
    _id: 'dahdagdatweawtdaweasda',
    username: 'Alberto',
    name: 'testName',
    description: 'testDescription',
    exercises: [
        {
            _id: '1',
            name: 'Adductor/Groin',
            force: 'static',
            level: 'intermediate',
            mechanic: null,
            equipment: null,
            primaryMuscles: ['adductors'],
            secondaryMuscles: [],
            instructions: [
                'Lie on your back with your feet raised towards the ceiling.',
                'Have your partner hold your feet or ankles. Abduct your legs as far as you can. This will be your starting position.',
                'Attempt to squeeze your legs together for 10 or more seconds, while your partner prevents you from doing so.',
                'Now, relax the muscles in your legs as your partner pushes your feet apart, stretching as far as is comfortable for you. Be sure to let your partner know when the stretch is adequate to prevent overstretching or injury.',
            ],
            category: 'stretching',
            photo: 'whatever',
        },
        {
            _id: '2',
            name: 'Seated Bent-Over One-Arm Dumbbell Triceps Extension',
            force: 'push',
            level: 'beginner',
            mechanic: 'isolation',
            equipment: 'dumbbell',
            primaryMuscles: ['triceps'],
            secondaryMuscles: [],
            instructions: [
                'Sit down at the end of a flat bench with a dumbbell in one arm using a neutral grip (palms of the hand facing you).',
                'Bend your knees slightly and bring your torso forward, by bending at the waist, while keeping the back straight until it is almost parallel to the floor. Make sure that you keep the head up.',
                'The upper arm with the dumbbell should be close to the torso and aligned with it (lifted up until it is parallel to the floor while the forearms are pointing towards the floor as the hands hold the weights). Tip: There should be a 90-degree angle between the forearms and the upper arm. This is your starting position.',
                'Keeping the upper arm stationary, use the triceps to lift the weight as you exhale until the forearm is parallel to the floor and the whole arm is extended. Like many other arm exercises, only the forearm moves.',
                'After a second contraction at the top, slowly lower the dumbbell back to the starting position as you inhale.',
                'Repeat the movement for the prescribed amount of repetitions.',
                'Switch arms and repeat the exercise.',
            ],
            category: 'strength',
            photo: 'whatever',
        },
    ],
};

function renderworkoutCard() {
    render(
        <BrowserRouter>
            <WorkoutCard workout={workout} />
        </BrowserRouter>,
    );
}
describe('WorkoutCard', () => {
    describe('when the WorkoutCard is rendered', async () => {
        it('make sure it is rendered with all its attributes', async () => {
            const data = [
                workout.name,
                workout.description,
                workout.exercises.length,
                'Adductors, Triceps',
            ];
            renderworkoutCard();

            for (const item of data) {
                expect(screen.getByText(item as string)).toBeInTheDocument();
            }
        });
    });
});
