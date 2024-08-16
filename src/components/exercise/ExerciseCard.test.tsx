import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';
import { IExercise } from '../../interfaces/exerciseInterface';

const exercise: IExercise = {
    _id: 'ada',
    name: '3/4 Sit-Up',
    force: 'pull',
    level: 'beginner',
    mechanic: 'compound',
    equipment: 'body only',
    primaryMuscles: ['abdominals', 'chest'],
    secondaryMuscles: ['calves', 'neck'],
    instructions: [
        'Lie down on the floor and secure your feet. Your legs should be bent at the knees.',
        'Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.',
        'Flex your hips and spine to raise your torso toward your knees.',
        'At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down.',
        'Repeat for the recommended amount of repetitions.',
    ],
    category: 'strength',
    photo: 'test',
};

function renderExerciseCard() {
    render(
        <BrowserRouter>
            <ExerciseCard exercise={exercise} />
        </BrowserRouter>,
    );
}
describe('ExerciseCard', () => {
    describe('when the ExerciseCard is rendered', async () => {
        it('make sure it is rendered with all its attributes', async () => {
            const data = [
                exercise.name,
                exercise.force,
                exercise.level,
                exercise.mechanic,
                exercise.equipment,
                exercise.category,
            ];
            renderExerciseCard();

            for (const item of data) {
                expect(screen.getByText(item as string)).toBeInTheDocument();
            }
        });
    });
});
