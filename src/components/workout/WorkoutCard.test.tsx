import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WorkoutCard from './WorkoutCard';
import IWorkout from '../../interfaces/workoutInterface';
import workouts from '@/testData/workouts';

const workout: IWorkout = workouts[0];

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
                'Abdominals, Shoulders',
            ];
            renderworkoutCard();

            for (const item of data) {
                expect(screen.getByText(item as string)).toBeInTheDocument();
            }
        });
    });
});
