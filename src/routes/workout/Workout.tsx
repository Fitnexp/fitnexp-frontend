import ExerciseCard from '@/components/exercise/ExerciseCard';
import { IExercise, ICompletedExercise } from '@/interfaces/exerciseInterface';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Book, Trash } from 'lucide-react';
import IWorkout from '@/interfaces/workoutInterface';
import { Skeleton } from '@/components/ui/skeleton';
import PageHeader from '@/components/common/PageHeader';

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
    const [exerciseSelector, setExerciseSelector] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<IExercise[]>([]);
    const [error, setError] = useState(false);

    let timeout: NodeJS.Timeout;

    const navigate = useNavigate();

    const { workout } = location.state;

    useEffect(() => {
        if (completedExercises) {
            for (const completedExercise of completedExercises) {
                if (
                    typeof completedExercise[0].rest !== 'number' ||
                    completedExercise[0].rest < 1
                ) {
                    setError(true);
                    return;
                }
                for (const set of completedExercise[0].sets) {
                    if (
                        typeof set.repetitions !== 'number' ||
                        set.repetitions < 1
                    ) {
                        setError(true);
                        return;
                    }
                    if (typeof set.weight !== 'number' || set.weight < 1) {
                        setError(true);
                        return;
                    }
                }
            }
            setError(false);
        }
    }, [completedExercises]);

    useEffect(() => {
        document.title = 'Fitnexp - Workout';

        if (exerciseSelector) {
            axios
                .get(`${import.meta.env.VITE_SERVER_URI}/api/exercises`, {
                    withCredentials: true,
                })
                .then((res) => {
                    setExercises(res.data.exercises);
                    setFilteredExercises(res.data.exercises);
                })
                .then(() => setLoading(false));
        }

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
    }, [workout, exerciseSelector]);

    function listSkeletons() {
        return new Array(10)
            .fill(0)
            .map(() => (
                <Skeleton
                    key={crypto.randomUUID()}
                    className="my-4 h-32 w-full"
                />
            ));
    }

    function ListChosenExercises({
        exercises,
    }: {
        readonly exercises: IExercise[];
    }) {
        return exercises.map((exercise, index) => (
            <button
                key={exercise._id}
                onClick={() => {
                    const exercise = exercises[index];
                    axios
                        .post(
                            `${import.meta.env.VITE_SERVER_URI}/api/workouts/${workout._id}/exercises`,
                            exercise,
                            {
                                withCredentials: true,
                            },
                        )
                        .then(() => {
                            workout.exercises.push(exercise);
                            setCompletedExercises(null);
                            setExerciseSelector(false);
                        });
                }}
            >
                <ExerciseCard
                    exercise={exercise}
                    extended={null}
                    completedExercises={null}
                    setCompletedExercises={null}
                    position={null}
                />
            </button>
        ));
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (e.target.value === '') {
                setFilteredExercises(exercises);
                return;
            }
            const filtered = exercises.filter((exercise) =>
                exercise.name
                    .toLowerCase()
                    .includes(e.target.value.toLocaleLowerCase()),
            );
            setFilteredExercises(filtered);
        }, 300);
    };

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

    if (exerciseSelector) {
        return (
            <div className="relative flex w-full flex-col">
                <PageHeader
                    icon={<Book size={48} />}
                    title={'Choose an exercise'}
                    onChange={onChange}
                    placeholder={'Push Up'}
                >
                    <div className="fixed left-0 top-0 z-50 w-full bg-white md:top-16 xl:sticky xl:top-0">
                        {' '}
                        <button
                            className={`m-4 w-fit rounded bg-slate-700 px-4 py-2 text-white`}
                            onClick={() => {
                                setExerciseSelector(false);
                            }}
                        >
                            Go Back
                        </button>
                    </div>
                </PageHeader>

                {loading ? (
                    listSkeletons()
                ) : (
                    <ListChosenExercises exercises={filteredExercises} />
                )}
            </div>
        );
    } else {
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
                                className={`mt-2 w-fit rounded ${completedExercises !== null && completedExercises.length > 0 && error === false ? 'bg-slate-700' : 'cursor-default bg-slate-300'} px-4 py-2 text-white`}
                                onClick={() => {
                                    if (
                                        completedExercises !== null &&
                                        completedExercises.length > 0 &&
                                        error === false
                                    ) {
                                        handleStartWorkout(
                                            workout.exercises,
                                            completedExercises,
                                        );
                                    }
                                }}
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
                        <div className="justfiy-center flex">
                            <button
                                className={`mx-auto my-4 w-fit rounded bg-slate-700 px-4 py-2 text-white`}
                                onClick={() => {
                                    setExerciseSelector(true);
                                }}
                            >
                                Add Exercise
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default Workout;
