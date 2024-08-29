import ExerciseData from '@/components/exercise/ExerciseData';
import { useLocation } from 'react-router-dom';
import ExerciseInstructions from '@/components/exercise/ExerciseInstructions';
import { Clock4, ChartColumn, Medal } from 'lucide-react';
import { ICompletedExercise, IExercise } from '@/interfaces/exerciseInterface';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseSets from '@/components/exercise/ExerciseSets';
import Stats from '@/components/common/Stats';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

function Exercises() {
    const location = useLocation();
    const { exercise } = location.state;
    const [completedExercises, setCompletedExercises] = useState<
        ICompletedExercise[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = `Fitnexp - ${exercise.name}`;

        axios
            .get<{ completedExercises: ICompletedExercise[] }>(
                `${import.meta.env.VITE_SERVER_URI}/api/exercises/completed-exercises`,
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                setCompletedExercises(
                    res.data.completedExercises.filter(
                        (e) => e.exercise_name === exercise.name,
                    ),
                );
                setLoading(false);
            });
    }, [exercise.name]);

    const exercises: IExercise[] = [];
    for (const completedExercise of completedExercises) {
        exercise.completedExercise = completedExercise;
        exercises.push(exercise);
    }

    const personalRecords = [
        {
            label: 'Greatest Weight',
            value: exercise.completedExercise?.greatest_weight + ' Kg',
        },
        {
            label: 'Greatest Theorical 1RM',
            value: exercise.completedExercise?.greatest_theorical_onerm + ' Kg',
        },
        {
            label: 'Greatest Volume (1 set)',
            value: exercise.completedExercise?.greatest_volume_oneset + ' Kg',
        },
        {
            label: 'Greatest Volume',
            value: exercise.completedExercise?.greatest_volume + ' Kg',
        },
    ];

    return (
        <div>
            <div className={`my-4 flex w-full flex-col gap-4 p-4`}>
                <ExerciseData exercise={exercise} />
            </div>
            <div className="flex w-full flex-col gap-8 p-2 xl:p-0">
                <ExerciseInstructions exercise={exercise} />
                {!loading &&
                    (completedExercises.length === 0 ? (
                        <h1 className="mx-auto p-8 text-center text-5xl font-bold">
                            NO DATA ABOUT THIS EXERCISE
                        </h1>
                    ) : (
                        <>
                            <h1 className="flex w-full items-center gap-2 bg-white text-3xl font-bold">
                                <Clock4 /> Last Time Results
                            </h1>
                            <ExerciseSets
                                completedExercise={completedExercises[0]}
                            />
                            <h1 className="flex w-full items-center gap-2 bg-white text-3xl font-bold">
                                <ChartColumn /> Charts
                            </h1>
                            <Stats
                                exercises={exercises}
                                date={new Date()}
                                profile={false}
                            />
                            <h1 className="flex w-full items-center gap-2 bg-white text-3xl font-bold">
                                <Medal /> Personal Records
                            </h1>
                            <Table className="mb-8">
                                <TableHeader></TableHeader>
                                <TableBody>
                                    {personalRecords.map((record) => (
                                        <TableRow key={record.label}>
                                            <TableCell>
                                                {record.label}
                                            </TableCell>
                                            <TableCell>
                                                {record.value}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    ))}
            </div>
        </div>
    );
}

export default Exercises;
