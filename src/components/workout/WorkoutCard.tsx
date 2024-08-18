import IWorkout from '@/interfaces/workoutInterface';
import { Dumbbell } from 'lucide-react';

function WorkoutCard({ workout }: { readonly workout: Readonly<IWorkout> }) {
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    function getAllPrimaryMuscles() {
        const allPrimaryMuscles = new Set<string>();

        workout.exercises.forEach((exercise) => {
            exercise.primaryMuscles.forEach((muscle) => {
                allPrimaryMuscles.add(capitalizeFirstLetter(muscle));
            });
        });

        return Array.from(allPrimaryMuscles).join(', ');
    }

    const numExercises = workout.exercises.length;

    return (
        <div className="flex h-full cursor-pointer flex-col gap-4 p-4 shadow hover:bg-slate-100">
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="h-32 min-h-32 w-32 min-w-32">
                    <img
                        src={workout.exercises[0].photo}
                        alt={workout.name}
                        className="h-full w-full rounded-md object-cover"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-clip text-3xl font-bold">
                        {workout.name}
                    </h1>
                    <h2 className="text-xl font-bold text-red-600">
                        {getAllPrimaryMuscles()}
                    </h2>
                    <h2 className="flex items-center gap-2 text-2xl font-bold">
                        {<Dumbbell size={24} />} {numExercises}
                    </h2>
                </div>
            </div>
            <h2 className="text-lg font-bold">{workout.description}</h2>
        </div>
    );
}

export default WorkoutCard;
