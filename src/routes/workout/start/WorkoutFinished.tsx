import { IExercise } from '@/interfaces/exerciseInterface';
import { useNavigate } from 'react-router-dom';

function WorkoutFinished({
    exercises,
}: {
    readonly exercises: readonly IExercise[];
}) {
    const navigate = useNavigate();

    const totalExercises = exercises.length;
    let totalKilogramsLifted = 0;
    let totalRepetitionsDone = 0;

    exercises.forEach((exercise) => {
        exercise.completedExercise?.sets.forEach((set) => {
            totalKilogramsLifted += set.weight * set.repetitions;
            totalRepetitionsDone += set.repetitions;
        });
    });

    return (
        <div className="my-8 flex w-full flex-col items-center justify-center gap-16 xl:gap-24">
            <h1 className="text-4xl font-bold">THAT'S IT!</h1>
            <div className="flex w-full flex-col items-start justify-around gap-8 xl:flex-row xl:gap-0">
                <div className="flex w-full flex-col items-center justify-between">
                    <h1 className="text-9xl font-bold">{totalExercises}</h1>
                    <h2 className="text-4xl font-bold">EXERCISES</h2>
                </div>
                <div className="flex w-full flex-col items-center justify-center">
                    <h1 className="text-9xl font-bold">
                        {totalKilogramsLifted}
                    </h1>
                    <h2 className="text-4xl font-bold">KILOGRAMS</h2>
                    <h2 className="text-4xl font-bold">LIFTED</h2>
                </div>
                <div className="flex w-full flex-col items-center justify-center">
                    <h1 className="text-9xl font-bold">
                        {totalRepetitionsDone}
                    </h1>
                    <h2 className="text-4xl font-bold">REPETITIONS</h2>
                    <h2 className="text-4xl font-bold">DONE</h2>
                </div>
            </div>
            <button
                className="rounded bg-slate-700 px-4 py-2 text-lg text-white"
                onClick={() => navigate('/workouts')}
            >
                Continue
            </button>
        </div>
    );
}

export default WorkoutFinished;
