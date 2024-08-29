import { ICompletedExercise, IExercise } from '@/interfaces/exerciseInterface';
import ExerciseData from './ExerciseData';
import ExerciseSets from './ExerciseSets';

function ExerciseCard({
    exercise,
    extended,
}: {
    readonly exercise: Readonly<IExercise>;
    readonly extended: ICompletedExercise | null;
}) {
    return (
        <div
            className={`my-4 flex w-full flex-col gap-4 p-4 shadow ${!extended && 'cursor-pointer hover:bg-slate-100'}`}
        >
            <ExerciseData exercise={exercise} />
            <ExerciseSets completedExercise={extended} />
        </div>
    );
}

export default ExerciseCard;
