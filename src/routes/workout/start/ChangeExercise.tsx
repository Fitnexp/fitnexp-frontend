import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { IExercise, Set } from '@/interfaces/exerciseInterface';
import ExerciseData from '@/components/exercise/ExerciseData';

function ChangeExercise({
    exercises,
    outerList,
    setOuterList,
    setView,
}: {
    readonly exercises: readonly IExercise[];
    readonly outerList: number;
    readonly setOuterList: (value: number) => void;
    readonly setView: (value: 'set' | 'rest' | 'exercise' | 'finish') => void;
}) {
    return (
        <div className="my-8 flex flex-col gap-12">
            <div>
                <h1 className="mx-2 text-lg">
                    {exercises[outerList].completedExercise?.rest} seconds rest
                    between sets
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
                        {exercises[outerList].completedExercise?.sets.map(
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
            </div>
            <h1 className="text-center text-5xl font-extrabold">
                GET READY FOR THE NEXT EXERCISE
            </h1>
            <div className={`my-4 flex w-full flex-col gap-4 p-4 shadow`}>
                <ExerciseData exercise={exercises[outerList + 1]} />

                <h1 className="text-lg">
                    {exercises[outerList + 1].completedExercise?.rest} seconds
                    rest between sets
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
                        {exercises[outerList + 1].completedExercise?.sets.map(
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
            </div>
            <button
                className="mx-auto w-fit rounded bg-slate-700 px-4 py-2 text-lg text-white"
                onClick={() => {
                    setOuterList(outerList + 1);
                    setView('set');
                }}
            >
                Continue
            </button>
        </div>
    );
}

export default ChangeExercise;
