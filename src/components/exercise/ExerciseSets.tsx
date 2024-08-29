import { ICompletedExercise, Set } from '@/interfaces/exerciseInterface';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

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
                    <h1 className="text-lg">
                        {completedExercise.rest} seconds rest between sets
                    </h1>
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
