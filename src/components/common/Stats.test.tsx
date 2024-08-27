class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserver;

import { expect, describe, it } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IExercise } from '../../interfaces/exerciseInterface';
import exercises from '@/testData/exercises';
import completedExercises from '@/testData/completedExercises';
import Stats from './Stats';

const exercisesTest: IExercise[] = [exercises[5], exercises[5], exercises[6]];
const completedExercisesTest = [
    completedExercises[0],
    completedExercises[1],
    completedExercises[2],
];

for (const exercise of exercisesTest) {
    exercise.completedExercise =
        completedExercisesTest[exercisesTest.indexOf(exercise)];
}

const date = new Date('2024-08-27T16:43:07Z'); // UTC time

function renderStats() {
    render(
        <BrowserRouter>
            <Stats exercises={exercises} date={date} />
        </BrowserRouter>,
    );
}

describe('Stats', () => {
    describe('when the Stats is rendered', async () => {
        it('make sure it is rendered and works correctly', async () => {
            renderStats();
            expect(screen.getByText('Repetitions')).toBeTruthy();

            let button = screen.getByRole('button', { name: 'Volume' });
            act(() => {
                fireEvent.click(button);
            });
            expect(button.classList.contains('bg-white')).toBeTruthy();

            button = screen.getByRole('button', { name: 'Repetitions' });
            act(() => {
                fireEvent.click(button);
            });
            expect(button.classList.contains('bg-white')).toBeTruthy();
        });
    });
});
