import { IExercise } from './exerciseInterface';

export default interface IWorkout {
    _id: string;
    username: string;
    name: string;
    description?: string;
    exercises: IExercise[];
}
