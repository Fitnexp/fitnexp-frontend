import { IExercise } from '@/interfaces/exerciseInterface';

function ExerciseInstructions({ exercise }: { readonly exercise: IExercise }) {
    return (
        <div className="flex w-full flex-col gap-8 md:flex-row">
            <div className="auto w-full">
                <img
                    src={exercise.photo}
                    alt={exercise.name}
                    className="h-full w-full rounded-md object-cover"
                />
            </div>
            <ol className="list-inside list-decimal">
                {exercise.instructions.map((instruction: string) => (
                    <li key={crypto.randomUUID()} className="my-2">
                        {instruction}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ExerciseInstructions;
