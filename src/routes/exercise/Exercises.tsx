import { Book } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IExercise } from '@/interfaces/exerciseInterface';
import { Skeleton } from '@/components/ui/skeleton';
import ExerciseCard from '../../components/exercise/ExerciseCard';
import { useNavigate } from 'react-router-dom';

function ListExercises({ exercises }: { readonly exercises: IExercise[] }) {
    const navigate = useNavigate();
    return exercises.map((exercise) => (
        <button
            key={exercise._id}
            onClick={() =>
                navigate(`/exercise/${exercise._id}`, {
                    state: {
                        exercise: exercises.filter(
                            (e) => e._id === exercise._id,
                        )[0],
                    },
                })
            }
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

function Exercises() {
    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<IExercise[]>([]);
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        document.title = 'Fitnexp - Exercises';

        axios
            .get(`${import.meta.env.VITE_SERVER_URI}/api/exercises`, {
                withCredentials: true,
            })
            .then((res) => {
                setExercises(res.data.exercises);
                setFilteredExercises(res.data.exercises);
            })
            .then(() => setLoading(false));
    }, []);

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

    return (
        <div className="flex w-full flex-col">
            <PageHeader
                icon={<Book size={48} />}
                title={'Exercises'}
                onChange={onChange}
                placeholder={'Push Up'}
            />
            {loading ? (
                listSkeletons()
            ) : (
                <ListExercises exercises={filteredExercises} />
            )}
        </div>
    );
}

export default Exercises;
