import { Dumbbell } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IWorkout from '@/interfaces/workoutInterface';
import WorkoutCard from '@/components/workout/WorkoutCard';

function Workout() {
    const [loading, setLoading] = useState(true);
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState<IWorkout[]>([]);
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_SERVER_URI}/api/workouts`, {
                withCredentials: true,
            })
            .then((res) => {
                setWorkouts(res.data.workouts);
                setFilteredWorkouts(res.data.workouts);
            })
            .then(() => setLoading(false));
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (e.target.value === '') {
                setFilteredWorkouts(workouts);
                return;
            }
            const filtered = workouts.filter((workout) =>
                workout.name
                    .toLowerCase()
                    .includes(e.target.value.toLocaleLowerCase()),
            );
            setFilteredWorkouts(filtered);
        }, 300);
    };

    function listWorkouts(workouts: IWorkout[]) {
        const rows = [];
        for (let i = 0; i < workouts.length; i += 2) {
            rows.push(
                <tr className="hidden md:table-row" key={crypto.randomUUID()}>
                    <td className="h-full w-1/2 p-2">
                        <WorkoutCard
                            workout={workouts[i]}
                            key={workouts[i]._id}
                        />
                    </td>
                    <td className="h-full w-full p-2">
                        {workouts[i + 1] ? (
                            <WorkoutCard
                                workout={workouts[i + 1]}
                                key={workouts[i + 1]._id}
                            />
                        ) : (
                            <div className="h-full w-full" />
                        )}
                    </td>
                </tr>,
            );
        }
        for (const workout of workouts) {
            rows.push(
                <tr className="table-row md:hidden" key={crypto.randomUUID()}>
                    <td className="h-full w-full p-2">
                        <WorkoutCard workout={workout} key={workout._id} />
                    </td>
                </tr>,
            );
        }
        return (
            <table className="mx-1 my-4 h-full w-full">
                <tbody>{rows}</tbody>
            </table>
        );
    }

    return (
        <div className="flex w-full flex-col">
            <PageHeader
                icon={<Dumbbell size={48} />}
                title={'Workouts'}
                onChange={onChange}
                placeholder={'Core Strength'}
            />
            {loading ? 'Loading...' : listWorkouts(filteredWorkouts)}
        </div>
    );
}

export default Workout;
