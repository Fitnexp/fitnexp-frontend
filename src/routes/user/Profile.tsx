import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { IUser } from '@/interfaces/userInterface';
import { ICompletedExercise, IExercise } from '@/interfaces/exerciseInterface';
import { Calendar } from '@/components/ui/calendar';
import ExerciseCard from '@/components/exercise/ExerciseCard';
import Stats from '@/components/common/Stats';

function getUserData(
    setUserData: React.Dispatch<React.SetStateAction<IUser | null>>,
    setUserLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void {
    axios
        .get<IUser>(`${import.meta.env.VITE_SERVER_URI}/api/logged-user`, {
            withCredentials: true,
        })
        .then((res) => {
            setUserData(res.data);
            setUserLoading(false);
        });
}

function getCompletedExercises(
    setExercises: React.Dispatch<React.SetStateAction<IExercise[]>>,
    setExercisesLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void {
    axios
        .get<{ completedExercises: ICompletedExercise[] }>(
            `${import.meta.env.VITE_SERVER_URI}/api/exercises/completed-exercises`,
            {
                withCredentials: true,
            },
        )
        .then((res) => {
            getExercises(
                res.data.completedExercises,
                setExercises,
                setExercisesLoading,
            );
        });
}

function getExercises(
    completedExercises: ICompletedExercise[],
    setExercises: React.Dispatch<React.SetStateAction<IExercise[]>>,
    setExercisesLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void {
    axios
        .post(
            `${import.meta.env.VITE_SERVER_URI}/api/exercises/names`,
            {
                names: completedExercises.map(
                    (exercise: ICompletedExercise) => exercise.exercise_name,
                ),
            },
            {
                withCredentials: true,
            },
        )
        .then((res) => {
            const exercises: IExercise[] = res.data.exercises;
            for (let i = 0; i < exercises.length; i++) {
                exercises[i].completedExercise = completedExercises[i];
            }
            setExercises(exercises);
            setExercisesLoading(false);
        });
}

function ListExercises({
    filteredExercises,
}: {
    readonly filteredExercises: IExercise[];
}) {
    if (filteredExercises.length === 0) {
        return (
            <h1 className="mx-auto p-8 text-center text-5xl font-bold">
                NO EXERCISES FOUND
            </h1>
        );
    }
    return filteredExercises.map((exercise) => (
        <ExerciseCard
            key={crypto.randomUUID()}
            exercise={exercise}
            extended={exercise.completedExercise || null}
        />
    ));
}

function Profile(): JSX.Element {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<IExercise[]>([]);

    const [userLoading, setUserLoading] = useState<boolean>(true);
    const [exercisesLoading, setExercisesLoading] = useState<boolean>(true);

    const [date, setDate] = useState<Date | undefined>(new Date());

    useEffect(() => {
        document.title = 'Fitnexp - Profile';
        getUserData(setUserData, setUserLoading);
        getCompletedExercises(setExercises, setExercisesLoading);
    }, []);

    useEffect(() => {
        if (date && exercises.length > 0) {
            const filtered = exercises.filter((exercise) => {
                if (exercise.completedExercise) {
                    const createdAt =
                        exercise.completedExercise.createdAt.split('T')[0];
                    const pickedDate = new Date(
                        date.getTime() + 2 * 60 * 60 * 1000,
                    )
                        .toISOString()
                        .split('T')[0];
                    return createdAt === pickedDate;
                }
                return false;
            });
            setFilteredExercises(filtered);
        }
    }, [date, exercises]);

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="relative bottom-0 z-10 flex flex-col xl:sticky xl:top-0">
                <h1 className="z-50 hidden w-full items-center gap-4 bg-white px-8 pb-4 pt-8 text-5xl font-bold xl:flex">
                    <User size={48} /> My Profile
                </h1>
            </div>
            <div className="mx-6 flex flex-col gap-6 xl:mx-0">
                <div>
                    <h1 className="text-4xl font-bold">
                        {userLoading ? '...' : userData?.exercisesDone}
                    </h1>
                    <h2 className="text-2xl font-bold">EXERCISES</h2>
                </div>
                <div>
                    <h1 className="text-4xl font-bold">
                        {userLoading ? '...' : userData?.weightLifted}
                    </h1>
                    <h2 className="text-2xl font-bold">KILOGRAMS LIFTED</h2>
                </div>
                <div>
                    <h1 className="text-4xl font-bold">
                        {userLoading ? '...' : userData?.repetitionsDone}
                    </h1>
                    <h2 className="text-2xl font-bold">REPETITIONS DONE</h2>
                </div>
            </div>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="mx-auto rounded-md border"
            />
            {typeof date === 'undefined' ? (
                <h1 className="mx-auto p-8 text-center text-5xl font-bold">
                    PICK A DATE
                </h1>
            ) : (
                <>
                    {exercisesLoading ? (
                        <Skeleton className="h-40 w-full" />
                    ) : (
                        <Stats
                            exercises={exercises}
                            date={date}
                            profile={true}
                        />
                    )}
                    {exercisesLoading ? (
                        <Skeleton className="h-40 w-full" />
                    ) : (
                        <ListExercises filteredExercises={filteredExercises} />
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;
