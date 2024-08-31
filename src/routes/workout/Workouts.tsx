import { Dumbbell } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IWorkout from '@/interfaces/workoutInterface';
import WorkoutCard from '@/components/workout/WorkoutCard';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormFieldComponent from '@/components/user/FormFieldComponent';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    name: z.string({ message: 'Email is required' }),
    description: z.string().optional(),
});

function AddWorkoutForm({
    setWorkouts,
}: {
    readonly setWorkouts: React.Dispatch<React.SetStateAction<IWorkout[]>>;
}) {
    const [error, setError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setError(null);
        axios
            .post(`${import.meta.env.VITE_SERVER_URI}/api/workouts`, values, {
                withCredentials: true,
            })
            .then(() => {
                setWorkouts([]);
            })
            .catch((err) => {
                setError(Object.values(err.response.data.errors)[0] as string);
            });
    };

    return (
        <Form {...form}>
            <form
                className="m-4 w-11/12"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormFieldComponent name="name" label="Name" />
                <FormFieldComponent
                    name="description"
                    label="Description (Optional)"
                    type="text"
                />
                {error && (
                    <h3 id="error" className="text-red-500">
                        {error}
                    </h3>
                )}
                <Button type="submit" className="m-4 w-fit bg-slate-700">
                    Create
                </Button>
            </form>
        </Form>
    );
}

function Workouts() {
    const [loading, setLoading] = useState(true);
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState<IWorkout[]>([]);
    const [toggleWorkoutForm, setToggleWorkoutForm] = useState(false);
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        document.title = 'Fitnexp - Workouts';

        if (workouts.length === 0) {
            axios
                .get(`${import.meta.env.VITE_SERVER_URI}/api/workouts`, {
                    withCredentials: true,
                })
                .then((res) => {
                    setWorkouts(res.data.workouts);
                    setFilteredWorkouts(res.data.workouts);
                })
                .then(() => setLoading(false));
        }
    }, [workouts]);

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

    function listSkeletons() {
        const rows = [];
        for (let i = 0; i < 10; i++) {
            rows.push(
                <tr className="hidden md:table-row" key={crypto.randomUUID()}>
                    <td className="h-full w-1/2 p-2">
                        <Skeleton
                            key={crypto.randomUUID()}
                            className="h-40 w-full"
                        />
                    </td>
                    <td className="h-full w-full p-2">
                        <Skeleton
                            key={crypto.randomUUID()}
                            className="h-40 w-full"
                        />
                    </td>
                </tr>,
            );
        }
        for (let i = 0; i < 10; i++) {
            rows.push(
                <tr className="table-row md:hidden" key={crypto.randomUUID()}>
                    <td className="h-full w-full p-2">
                        <Skeleton
                            key={crypto.randomUUID()}
                            className="h-40 w-full"
                        />
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
            >
                <div className="fixed left-0 top-0 z-50 w-full bg-white md:top-16 xl:sticky xl:top-0">
                    {' '}
                    <button
                        className={`border-1 m-4 w-fit rounded border ${toggleWorkoutForm ? 'border-slate-700 bg-slate-700 text-white' : 'border-black bg-slate-200 text-black'} px-4 py-2`}
                        onClick={() => {
                            setToggleWorkoutForm(!toggleWorkoutForm);
                        }}
                    >
                        Add Workout
                    </button>
                    {toggleWorkoutForm && (
                        <AddWorkoutForm setWorkouts={setWorkouts} />
                    )}
                </div>
            </PageHeader>
            {loading ? listSkeletons() : listWorkouts(filteredWorkouts)}
        </div>
    );
}

export default Workouts;
