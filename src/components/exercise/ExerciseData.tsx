import { IExercise } from '@/interfaces/exerciseInterface';
import { Badge } from '@/components/ui/badge';

function ExerciseData({ exercise }: Readonly<{ exercise: IExercise }>) {
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const primaryMuscles = exercise.primaryMuscles.map(capitalizeFirstLetter);
    const secondaryMuscles = exercise.secondaryMuscles.map(
        capitalizeFirstLetter,
    );
    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="h-32 w-32">
                <img
                    src={exercise.photo}
                    alt={exercise.name}
                    className="h-full w-full rounded-md object-cover"
                />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <h1 className="w-full text-start text-3xl font-bold">
                        {exercise.name}
                    </h1>
                    <h2 className="text-start text-xl">
                        {primaryMuscles.map((muscle: string, index: number) => (
                            <span
                                key={crypto.randomUUID()}
                                className="font-bold text-red-600"
                            >
                                {muscle}
                                {index < primaryMuscles.length - 1 && ', '}
                            </span>
                        ))}
                        {secondaryMuscles.length > 0 &&
                            primaryMuscles.length > 0 &&
                            ', '}
                        {secondaryMuscles.join(', ')}
                    </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    {exercise.level && (
                        <Badge variant={exercise.level}>{exercise.level}</Badge>
                    )}
                    {exercise.force && (
                        <Badge variant="secondary">{exercise.force}</Badge>
                    )}
                    {exercise.mechanic && (
                        <Badge variant="secondary">{exercise.mechanic}</Badge>
                    )}
                    {exercise.equipment && (
                        <Badge variant="secondary">{exercise.equipment}</Badge>
                    )}
                    {exercise.category && (
                        <Badge variant="secondary">{exercise.category}</Badge>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ExerciseData;
