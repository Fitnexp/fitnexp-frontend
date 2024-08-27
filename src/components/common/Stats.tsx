import { IExercise } from '@/interfaces/exerciseInterface';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState } from 'react';

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';

function getChartData(
    exercises: IExercise[],
    date: Date,
    value: 'Repetitions' | 'Volume',
) {
    const daysInMonth: { [key: string]: number } = {
        '01': 31,
        '02': 29,
        '03': 31,
        '04': 30,
        '05': 31,
        '06': 30,
        '07': 31,
        '08': 31,
        '09': 30,
        '10': 31,
        '11': 30,
        '12': 31,
    };

    function getMonth(date: Date | string): string {
        if (typeof date === 'string') {
            return date.split('-')[1];
        }
        const pickedDate = new Date(
            date.getTime() + 2 * 60 * 60 * 1000,
        ).toISOString();
        return pickedDate.split('-')[1];
    }

    function getDay(date: string): string {
        return date.split('T')[0].split('-')[2];
    }

    function filterExercisesByMonth(exercises: IExercise[], date: Date) {
        return exercises.filter(
            (exercise) =>
                exercise.completedExercise &&
                getMonth(exercise.completedExercise.createdAt) ===
                    getMonth(date),
        );
    }

    function getValueData(
        day: string,
        exercises: IExercise[],
        value: 'Repetitions' | 'Volume',
    ) {
        const filteredExercises = exercises.filter(
            (exercise) =>
                exercise.completedExercise &&
                getDay(exercise.completedExercise.createdAt) === day,
        );
        if (filteredExercises.length === 0) {
            return 0;
        }

        if (value === 'Repetitions') {
            let reps = 0;
            for (const exercise of filteredExercises) {
                for (const set of exercise.completedExercise?.sets || []) {
                    reps += set.repetitions;
                }
            }
            return reps;
        }

        /* istanbul ignore next */
        if (value === 'Volume') {
            let volume = 0;
            for (const exercise of filteredExercises) {
                for (const set of exercise.completedExercise?.sets || []) {
                    volume += set.repetitions * set.weight;
                }
            }
            return volume;
        }
    }

    const filteredExercises = filterExercisesByMonth(exercises, date);
    const data = [];
    for (let i = 1; i <= daysInMonth[getMonth(date)]; i++) {
        const paddedDay = i < 10 ? '0' + i : i.toString();
        data.push({
            day: paddedDay,
            value: getValueData(paddedDay, filteredExercises, value),
        });
    }

    return data;
}

function Stats({
    exercises,
    date,
}: {
    readonly exercises: IExercise[];
    readonly date: Date;
}) {
    const [value, setValue] = useState<'Repetitions' | 'Volume'>('Repetitions');
    const chartData = getChartData(exercises, date, value);

    const chartConfig = {
        value: {
            label: value,
            color: '#2563eb',
        },
    } satisfies ChartConfig;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center rounded-md bg-blue-100 p-1">
                <button
                    onClick={() => setValue('Repetitions')}
                    className={`w-full rounded py-2 ${value === 'Repetitions' ? 'bg-white' : ''}`}
                >
                    Repetitions
                </button>
                <button
                    onClick={() => setValue('Volume')}
                    className={`w-full rounded py-2 ${value === 'Volume' ? 'bg-white' : ''}`}
                >
                    Volume
                </button>
            </div>
            <ChartContainer
                config={chartConfig}
                className="max-h-[300px] min-h-[200px] w-full"
            >
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <YAxis tickLine={false} tickMargin={10} axisLine={false} />
                    <ChartTooltip
                        content={<ChartTooltipContent hideLabel={true} />}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                        dataKey="value"
                        fill={`var(--color-value)`}
                        radius={4}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
}

export default Stats;
