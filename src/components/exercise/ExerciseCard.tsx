import {
    ICompletedExercise,
    IExercise,
    Set,
} from '@/interfaces/exerciseInterface';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import ExerciseData from './ExerciseData';

function ExerciseCard({
    exercise,
    extended,
}: {
    readonly exercise: Readonly<IExercise>;
    readonly extended: ICompletedExercise | null;
}) {
    return (
        <div
            className={`my-4 flex w-full flex-col gap-4 p-4 shadow ${!extended && 'cursor-pointer hover:bg-slate-100'}`}
        >
            <ExerciseData exercise={exercise} />
            {Array.isArray(extended) && (
                <>
                    <h1 className="text-lg">
                        {extended[0].rest} seconds rest between sets
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
                            {extended[0].sets.map((set: Set, index: number) => (
                                <TableRow key={crypto.randomUUID()}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{set.weight}</TableCell>
                                    <TableCell>{set.repetitions}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
        </div>
    );
}

export default ExerciseCard;
