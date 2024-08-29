import { ICompletedExercise, Set } from '@/interfaces/exerciseInterface';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

function ExerciseSets({
    completedExercise,
}: {
    readonly completedExercise: ICompletedExercise | null;
}) {
    if (completedExercise) {
        return (
            <>
                <h1 className="text-lg">
                    {completedExercise.rest} seconds rest between sets
                </h1>
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
            </>
        );
    }
    return null;
}

export default ExerciseSets;
