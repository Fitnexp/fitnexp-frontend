import { useLocation, useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { IExercise, Set } from '@/interfaces/exerciseInterface';
import { useState } from 'react';
import { Check } from 'lucide-react';
import WorkoutFinished from './WorkoutFinished';
import ChangeExercise from './ChangeExercise';
import Rest from './Rest';
import ExerciseData from '@/components/exercise/ExerciseData';
import axios from 'axios';

function WorkoutStart() {
    const [innerList, setInnerList] = useState(0);
    const [outerList, setOuterList] = useState(0);
    const [view, setView] = useState<'set' | 'rest' | 'exercise' | 'finish'>(
        'set',
    );
    const location = useLocation();
    const navigate = useNavigate();

    const { exercises } = location.state;
    const exercise: IExercise = exercises[outerList];

    function postCompletedExercise(exercise: IExercise) {
        axios.post(
            `${import.meta.env.VITE_SERVER_URI}/api/exercises/completed-exercise`,
            exercise.completedExercise,
            { withCredentials: true },
        );
    }

    function handleNextSet() {
        if (
            exercise.completedExercise &&
            innerList < exercise.completedExercise.sets.length - 1
        ) {
            setView('rest');
            return;
        }

        if (outerList < exercises.length - 1) {
            setInnerList(0);
            postCompletedExercise(exercise);
            setView('exercise');
            return;
        }

        postCompletedExercise(exercise);
        setView('finish');
    }

    return (
        <main className="mx-auto w-full xl:w-3/5">
            {view === 'finish' && <WorkoutFinished exercises={exercises} />}
            {view === 'rest' && (
                <Rest
                    exercise={exercise}
                    innerList={innerList}
                    setInnerList={setInnerList}
                    setView={setView}
                />
            )}
            {view === 'exercise' && (
                <ChangeExercise
                    exercises={exercises}
                    outerList={outerList}
                    setOuterList={setOuterList}
                    setView={setView}
                />
            )}
            {view === 'set' && (
                <>
                    <div className={`my-4 flex w-full flex-col gap-4 p-4`}>
                        <ExerciseData exercise={exercise} />
                    </div>
                    <div className="flex w-full flex-col gap-8 p-2 xl:p-0">
                        <div className="flex w-full flex-col gap-8 md:flex-row">
                            <div className="auto w-full">
                                <img
                                    src={exercise.photo}
                                    alt={exercise.name}
                                    className="h-full w-full rounded-md object-cover"
                                />
                            </div>
                            <ol className="list-inside list-decimal">
                                {exercise.instructions.map(
                                    (instruction: string) => (
                                        <li
                                            key={crypto.randomUUID()}
                                            className="my-2"
                                        >
                                            {instruction}
                                        </li>
                                    ),
                                )}
                            </ol>
                        </div>
                        <button
                            className="m-2 w-fit rounded bg-red-800 px-4 py-2 text-white xl:mx-0"
                            onClick={() => navigate('/workouts')}
                        >
                            Cancel Workout
                        </button>
                        <Table className="mb-8">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-black">
                                        Sets
                                    </TableHead>
                                    <TableHead className="text-black">
                                        Kilograms
                                    </TableHead>
                                    <TableHead className="text-black">
                                        Repetitions
                                    </TableHead>
                                    <TableHead className="text-black"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {exercise.completedExercise?.sets.map(
                                    (set: Set, index: number) => (
                                        <TableRow key={crypto.randomUUID()}>
                                            <TableCell
                                                className={`${index === innerList ? 'hover:none bg-green-200' : ''}`}
                                            >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                className={`${index === innerList ? 'hover:none bg-green-200' : ''}`}
                                            >
                                                {set.weight}
                                            </TableCell>
                                            <TableCell
                                                className={`${index === innerList ? 'hover:none bg-green-200' : ''}`}
                                            >
                                                {set.repetitions}
                                            </TableCell>
                                            <TableCell
                                                className={`${index === innerList ? 'hover:none bg-white' : ''}`}
                                            >
                                                {index === innerList ? (
                                                    <button
                                                        onClick={handleNextSet}
                                                        className="rounded-full bg-green-700"
                                                    >
                                                        <Check className="p-1 text-white" />
                                                    </button>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
        </main>
    );
}

export default WorkoutStart;
