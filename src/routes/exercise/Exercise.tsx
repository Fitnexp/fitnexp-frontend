import { Book } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IExercise } from '@/interfaces/exerciseInterface';
import { Skeleton } from '@/components/ui/skeleton';
import ExerciseCard from '../../components/exercise/ExerciseCard';

function Exercise() {
    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<IExercise[]>([]);
    let timeout: NodeJS.Timeout;

    useEffect(() => {
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

    function listExercises(exercises: IExercise[]) {
        return exercises.map((exercise) => (
            <ExerciseCard exercise={exercise} key={exercise._id} />
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
            {loading ? listSkeletons() : listExercises(filteredExercises)}
        </div>
    );
}

export default Exercise;
