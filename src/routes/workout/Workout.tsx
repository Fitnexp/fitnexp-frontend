import ExerciseCard from '@/components/exercise/ExerciseCard';
import { IExercise, ICompletedExercise } from '@/interfaces/exerciseInterface';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function listExercises(
    exercises: IExercise[],
    completedExercises: ICompletedExercise[][] | null,
) {
    return exercises.map((exercise, index) => (
        <ExerciseCard
            exercise={exercise}
            extended={completedExercises ? completedExercises[index][0] : null}
            key={exercise._id}
        />
    ));
}

function Workout() {
    const location = useLocation();
    const [completedExercises, setCompletedExercises] = useState(null);
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
    }, [workout._id]);

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
        if (completedExercises !== null) {
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
                    className="mt-2 w-fit rounded bg-slate-700 px-4 py-2 text-white"
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
            {listExercises(workout.exercises, completedExercises)}
        </div>
    );
}

export default Workout;
