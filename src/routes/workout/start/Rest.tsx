import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { IExercise, Set } from '@/interfaces/exerciseInterface';
import { useState, useEffect } from 'react';

function Rest({
    exercise,
    innerList,
    setInnerList,
    setView,
}: {
    readonly exercise: IExercise;
    readonly innerList: number;
    readonly setInnerList: (value: number) => void;
    readonly setView: (value: 'set' | 'rest' | 'exercise') => void;
}) {
    const [timeLeft, setTimeLeft] = useState(
        exercise.completedExercise?.rest ?? 1,
    );
    const [isCountingDown, setIsCountingDown] = useState(true);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (isCountingDown) {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        setIsCountingDown(false);
                        return 0;
                    }
                } else {
                    return prevTime + 1;
                }
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [isCountingDown]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const setsDone = exercise.completedExercise?.sets.slice(0, innerList + 1);

    return (
        <div className="my-8 flex flex-col gap-12">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black">Sets</TableHead>
                        <TableHead className="text-black">Kilograms</TableHead>
                        <TableHead className="text-black">
                            Repetitions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {setsDone?.map((set: Set, index: number) => (
                        <TableRow key={crypto.randomUUID()}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{set.weight}</TableCell>
                            <TableCell>{set.repetitions}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <h1 className="text-center text-5xl font-extrabold">
                {isCountingDown ? 'TAKE A REST' : 'TIME IS UP!'}
            </h1>
            <div
                className={`text-center text-9xl font-bold ${isCountingDown ? '' : 'text-red-600'}`}
            >
                {formatTime(timeLeft)}
            </div>
            <button
                className="mx-auto w-fit rounded bg-slate-700 px-4 py-2 text-lg text-white"
                onClick={() => {
                    setInnerList(innerList + 1);
                    setView('set');
                }}
            >
                {isCountingDown ? 'Skip Timer' : 'Continue'}
            </button>
        </div>
    );
}

export default Rest;
