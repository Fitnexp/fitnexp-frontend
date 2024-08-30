import ExerciseCard from '@/components/exercise/ExerciseCard';
import { IExercise, ICompletedExercise } from '@/interfaces/exerciseInterface';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash } from 'lucide-react';
import IWorkout from '@/interfaces/workoutInterface';

function deleteExercise(
    workout: IWorkout,
    workoutId: string,
    index: number,
    completedExercises: ICompletedExercise[][] | null,
    setCompletedExercises: React.Dispatch<
        React.SetStateAction<ICompletedExercise[][] | null>
    >,
) {
    if (completedExercises === null || setCompletedExercises === null) {
        return;
    }

    axios
        .delete(
            `${import.meta.env.VITE_SERVER_URI}/api/workouts/${workoutId}/exercises/${index}`,
            {
                withCredentials: true,
            },
        )
        .then(() => {
            const updatedExercises = completedExercises.filter((_, i) => {
                return i !== index;
            });

            workout.exercises = workout.exercises.filter((_, i) => {
                return i !== index;
            });
            setCompletedExercises(updatedExercises);
        });
}

function listExercises(
    workout: IWorkout,
    workoutId: string,
    exercises: IExercise[],
    completedExercises: ICompletedExercise[][] | null,
    setCompletedExercises: React.Dispatch<
        React.SetStateAction<ICompletedExercise[][] | null>
    >,
) {
    return exercises.map((exercise, index) => (
        <ExerciseCard
            exercise={exercise}
            extended={completedExercises ? completedExercises[index][0] : null}
            completedExercises={completedExercises}
            setCompletedExercises={setCompletedExercises}
            position={index}
            key={exercise._id}
        >
            <button
                className="absolute right-4 top-4 rounded-full bg-red-800 p-2"
                onClick={() => {
                    deleteExercise(
                        workout,
                        workoutId,
                        index,
                        completedExercises,
                        setCompletedExercises,
                    );
                }}
            >
                <Trash className="text-white" size={18} />
            </button>
        </ExerciseCard>
    ));
}

function Workout() {
    const location = useLocation();
    const [completedExercises, setCompletedExercises] = useState<
        ICompletedExercise[][] | null
    >(null);
    const navigate = useNavigate();

    const { workout } = location.state;

    useEffect(() => {
        document.title = 'Fitnexp - Workout';

        axios
            .get(
                `${import.meta.env.VITE_SERVER_URI}/api/workouts/${workout._id}`,
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                setCompletedExercises(res.data.completedExercises);
            });
    }, [workout]);

    function getAllPrimaryMuscles() {
        const capitalizeFirstLetter = (str: string) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

        const allPrimaryMuscles = new Set<string>();

        workout.exercises.forEach((exercise: IExercise) => {
            exercise.primaryMuscles.forEach((muscle) => {
                allPrimaryMuscles.add(capitalizeFirstLetter(muscle));
            });
        });

        return Array.from(allPrimaryMuscles).join(', ');
    }

    function handleStartWorkout(
        exercises: IExercise[],
        completedExercises: ICompletedExercise[][] | null,
    ) {
        if (completedExercises !== null && completedExercises.length > 0) {
            exercises.forEach((exercise, index) => {
                exercise.completedExercise = completedExercises[index][0];
            });
            navigate(`/workout/${workout._id}/start`, {
                state: { exercises: exercises },
            });
        }
    }

    return (
        <div className="w-full">
            {workout && (
                <>
                    <div className="top-16 z-50 flex w-full flex-col gap-2 bg-white p-8 sm:sticky xl:top-0">
                        <h1 className="w-full items-center gap-4 bg-white text-5xl font-bold">
                            {workout.name}
                        </h1>
                        <h2 className="text-start text-xl font-bold text-red-600">
                            {getAllPrimaryMuscles()}
                        </h2>
                        <h2 className="text-start text-lg font-bold">
                            {workout.description}
                        </h2>
                        <button
                            className={`mt-2 w-fit rounded ${completedExercises !== null && completedExercises.length > 0 ? 'bg-slate-700' : 'bg-slate-300'} px-4 py-2 text-white`}
                            onClick={() =>
                                handleStartWorkout(
                                    workout.exercises,
                                    completedExercises,
                                )
                            }
                        >
                            Start Workout
                        </button>
                    </div>
                    {listExercises(
                        workout,
                        workout._id,
                        workout.exercises,
                        completedExercises,
                        setCompletedExercises,
                    )}
                </>
            )}
        </div>
    );
}

export default Workout;
