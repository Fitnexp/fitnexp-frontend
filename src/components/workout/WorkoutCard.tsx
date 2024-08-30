import IWorkout from '@/interfaces/workoutInterface';
import { Dumbbell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Placeholder from '../../assets/workout/placeholder.png';

function WorkoutCard({ workout }: { readonly workout: Readonly<IWorkout> }) {
    const navigate = useNavigate();

    function getAllPrimaryMuscles() {
        const capitalizeFirstLetter = (str: string) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

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
        <button
            className="flex h-full w-full cursor-pointer flex-col gap-4 p-4 shadow hover:bg-slate-100"
            onClick={() =>
                navigate(`/workout/${workout._id}`, {
                    state: { workout: workout },
                })
            }
        >
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="h-32 min-h-32 w-32 min-w-32">
                    <img
                        src={workout.exercises[0]?.photo ?? Placeholder}
                        alt={workout.name}
                        className="h-full w-full rounded-md object-cover"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-clip text-start text-3xl font-bold">
                        {workout.name}
                    </h1>
                    <h2 className="text-start text-xl font-bold text-red-600">
                        {getAllPrimaryMuscles()}
                    </h2>
                    <h2 className="flex items-center gap-2 text-start text-2xl font-bold">
                        {<Dumbbell size={24} />} {numExercises}
                    </h2>
                </div>
            </div>
            <h2 className="text-start text-lg font-bold">
                {workout.description}
            </h2>
        </button>
    );
}

export default WorkoutCard;
