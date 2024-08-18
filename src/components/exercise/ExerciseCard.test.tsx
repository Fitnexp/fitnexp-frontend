import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';
import { IExercise } from '../../interfaces/exerciseInterface';
import exercises from '@/testData/exercises';

const exercise: IExercise = exercises[0];

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
