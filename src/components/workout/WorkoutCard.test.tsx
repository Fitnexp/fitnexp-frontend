import { expect, describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
        it('if clicked, it should redirect to the workout page', async () => {
            renderworkoutCard();
            const card = screen.getByText(workout.name);
            expect(card).toBeInTheDocument();
            fireEvent.click(card);
            await waitFor(() => {
                expect(window.location.pathname).toBe(
                    `/workout/${workout._id}`,
                );
            });
        });
    });
});
