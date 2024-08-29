import { ICompletedExercise, IExercise } from '@/interfaces/exerciseInterface';
import ExerciseData from './ExerciseData';
import ExerciseSets from './ExerciseSets';

function ExerciseCard({
    exercise,
    extended,
    completedExercises,
    setCompletedExercises,
    position,
}: {
    readonly exercise: Readonly<IExercise>;
    readonly extended: ICompletedExercise | null;

    readonly completedExercises: ICompletedExercise[][] | null;
    readonly setCompletedExercises: React.Dispatch<
        React.SetStateAction<ICompletedExercise[][] | null>
    > | null;
    readonly position: number | null;
}) {
    return (
        <div
            className={`my-4 flex w-full flex-col gap-4 p-4 shadow ${!extended && 'cursor-pointer hover:bg-slate-100'}`}
        >
            <ExerciseData exercise={exercise} />
            <ExerciseSets
                completedExercise={extended}
                completedExercises={completedExercises}
                setCompletedExercises={setCompletedExercises}
                position={position}
            />
        </div>
    );
}

export default ExerciseCard;
