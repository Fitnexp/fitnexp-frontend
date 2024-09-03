import { ICompletedExercise, Set } from '@/interfaces/exerciseInterface';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';

function changeSetValue({
    completedExercise,
    completedExercises,
    setCompletedExercises,
    position,
    index,
    event,
    type,
}: {
    readonly completedExercise: ICompletedExercise;
    readonly completedExercises: ICompletedExercise[][];
    readonly setCompletedExercises: React.Dispatch<
        React.SetStateAction<ICompletedExercise[][] | null>
    >;
    readonly position: number;
    readonly index: number;
    readonly event: React.ChangeEvent<HTMLInputElement>;
    readonly type: 'weight' | 'repetitions' | 'rest';
}) {
    const updatedExercises = completedExercises.map((exercise, i) => {
        if (type === 'rest') {
            if (i === position) {
                return [
                    {
                        ...completedExercise,
                        rest: Number(event.target.value),
                    },
                ];
            }
            return exercise;
        }
        if (i === position) {
            return [
                {
                    ...completedExercise,
                    sets: completedExercise.sets.map((set, j) => {
                        if (j === index) {
                            if (type === 'weight') {
                                return {
                                    ...set,
                                    weight: Number(event.target.value),
                                };
                            }
                            if (type === 'repetitions') {
                                return {
                                    ...set,
                                    repetitions: Number(event.target.value),
                                };
                            }
                        }
                        return set;
                    }),
                },
            ];
        }
        return exercise;
    });
    setCompletedExercises(updatedExercises);
}

function handleAddSet({
    completedExercise,
    completedExercises,
    setCompletedExercises,
    position,
}: {
    readonly completedExercise: ICompletedExercise | null;
    readonly completedExercises: ICompletedExercise[][] | null;
    readonly setCompletedExercises: React.Dispatch<
        React.SetStateAction<ICompletedExercise[][] | null>
    > | null;
    readonly position: number | null;
}) {
    const newSet = {
        repetitions: 0,
        weight: 0,
    };
    if (
        !completedExercise ||
        !completedExercises ||
        !setCompletedExercises ||
        position === null
    ) {
        return;
    }
    const updatedExercises = completedExercises.map((exercise, index) => {
        if (index === position) {
            return [
                {
                    ...completedExercise,
                    sets: [...completedExercise.sets, newSet],
                },
            ];
        }
        return exercise;
    });
    // Update the state with the new array
    setCompletedExercises(updatedExercises);
}

function handleDeleteSet({
    completedExercise,
    completedExercises,
    setCompletedExercises,
    position,
    row,
}: {
    readonly completedExercise: ICompletedExercise | null;
    readonly completedExercises: ICompletedExercise[][] | null;
    readonly setCompletedExercises: React.Dispatch<
        React.SetStateAction<ICompletedExercise[][] | null>
    > | null;
    readonly position: number | null;
    readonly row: number;
}) {
    if (
        !completedExercise ||
        !completedExercises ||
        !setCompletedExercises ||
        position === null
    ) {
        return;
    }

    if (completedExercise.sets.length === 1) {
        return;
    }

    const updatedExercises = completedExercises.map((exercise, index) => {
        if (index === position) {
            return [
                {
                    ...completedExercise,
                    sets: completedExercise.sets.filter((_, i) => i !== row),
                },
            ];
        }
        return exercise;
    });

    // Update the state with the new array
    setCompletedExercises(updatedExercises);
}

function checkErrors({
    completedExercise,
    setError,
}: {
    readonly completedExercise: ICompletedExercise;
    readonly setError: React.Dispatch<React.SetStateAction<string | null>>;
}) {
    if (
        typeof completedExercise.rest !== 'number' ||
        completedExercise.rest < 1
    ) {
        setError('Invalid rest value');
        return;
    }
    for (const set of completedExercise.sets) {
        if (typeof set.repetitions !== 'number' || set.repetitions < 1) {
            setError('Invalid repetitions value');
            return;
        }
        if (typeof set.weight !== 'number' || set.weight < 1) {
            setError('Invalid weight value');
            return;
        }
    }
    setError(null);
}

function ExerciseSets({
    completedExercise,
    completedExercises,
    setCompletedExercises,
    position,
}: {
    readonly completedExercise: ICompletedExercise | null;
    readonly completedExercises: ICompletedExercise[][] | null;
    readonly setCompletedExercises: React.Dispatch<
        React.SetStateAction<ICompletedExercise[][] | null>
    > | null;
    readonly position: number | null;
}) {
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (completedExercise) {
            checkErrors({ completedExercise, setError });
        }
    }, [completedExercise, completedExercises, error]);

    if (completedExercise) {
        if (
            !completedExercises ||
            !setCompletedExercises ||
            position === null
        ) {
            return (
                <>
                    {' '}
                    <h1 className="text-lg">
                        {completedExercise.rest} seconds rest between sets
                    </h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-black">
                                    Sets
                                </TableHead>
                                <TableHead className="text-black">
                                    Kilograms
                                </TableHead>
                                <TableHead className="text-black">
                                    Repetitions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {completedExercise.sets.map(
                                (set: Set, index: number) => (
                                    <TableRow key={crypto.randomUUID()}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{set.weight}</TableCell>
                                        <TableCell>{set.repetitions}</TableCell>
                                    </TableRow>
                                ),
                            )}
                        </TableBody>
                    </Table>
                </>
            );
        }
        return (
            <>
                <div className="flex items-center justify-between">
                    {' '}
                    {edit ? (
                        <h1 className="text-lg">
                            <input
                                name="rest"
                                type="number"
                                defaultValue={completedExercise.rest}
                                className="border-1 w-3/12 rounded-full border border-black px-2 py-1"
                                min={0}
                                onBlur={(event) =>
                                    changeSetValue({
                                        completedExercise,
                                        completedExercises,
                                        setCompletedExercises,
                                        position,
                                        index: 0,
                                        event,
                                        type: 'rest',
                                    })
                                }
                            />{' '}
                            seconds rest between sets
                        </h1>
                    ) : (
                        <h1 className="text-lg">
                            {completedExercise.rest} seconds rest between sets
                        </h1>
                    )}
                    <button
                        className={`border-1 rounded-full border ${edit ? 'border-slate-700 bg-slate-700' : 'border-black bg-slate-200'} p-2`}
                        onClick={() => setEdit(!edit)}
                    >
                        <Pencil
                            className={edit ? 'text-white' : ''}
                            size={18}
                        />
                    </button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-black">Sets</TableHead>
                            <TableHead className="text-black">
                                Kilograms
                            </TableHead>
                            <TableHead className="text-black">
                                Repetitions
                            </TableHead>
                            {edit && <TableHead></TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {completedExercise.sets.map(
                            (set: Set, index: number) => (
                                <TableRow key={crypto.randomUUID()}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {edit ? (
                                            <input
                                                name="weight"
                                                type="number"
                                                defaultValue={set.weight}
                                                className="border-1 w-full rounded-full border border-black px-2 py-1"
                                                min={0}
                                                onBlur={(event) =>
                                                    changeSetValue({
                                                        completedExercise,
                                                        completedExercises,
                                                        setCompletedExercises,
                                                        position,
                                                        index,
                                                        event,
                                                        type: 'weight',
                                                    })
                                                }
                                            />
                                        ) : (
                                            set.weight
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {edit ? (
                                            <input
                                                name="repetitions"
                                                type="number"
                                                defaultValue={set.repetitions}
                                                className="border-1 w-full rounded-full border border-black px-2 py-1"
                                                min={0}
                                                onBlur={(event) =>
                                                    changeSetValue({
                                                        completedExercise,
                                                        completedExercises,
                                                        setCompletedExercises,
                                                        position,
                                                        index,
                                                        event,
                                                        type: 'repetitions',
                                                    })
                                                }
                                            />
                                        ) : (
                                            set.repetitions
                                        )}
                                    </TableCell>
                                    {edit && (
                                        <TableCell className="w-[50px]">
                                            <button
                                                className={`rounded-full ${completedExercise.sets.length === 1 ? 'cursor-default bg-slate-300' : 'bg-red-800'} `}
                                                onClick={() =>
                                                    handleDeleteSet({
                                                        completedExercise,
                                                        completedExercises,
                                                        setCompletedExercises,
                                                        position,
                                                        row: index,
                                                    })
                                                }
                                            >
                                                <X className="p-1 text-white" />
                                            </button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
                {error && <p className="font-bold text-red-600">{error}</p>}
                {edit && (
                    <button
                        className="mx-auto rounded bg-slate-700 px-4 py-2 text-white"
                        onClick={() => {
                            handleAddSet({
                                completedExercise,
                                completedExercises,
                                setCompletedExercises,
                                position,
                            });
                        }}
                    >
                        Add Set
                    </button>
                )}
            </>
        );
    }
    return null;
}

export default ExerciseSets;
