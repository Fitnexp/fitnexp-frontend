import IWorkout from '@/interfaces/workoutInterface';
import exercises from '@/testData/exercises';

const workouts: IWorkout[] = [
    {
        _id: '0',
        username: 'Alberto',
        name: 'Shoulders Sunday',
        description: 'Shoulder workout for Sunday',
        exercises: [exercises[5], exercises[6], exercises[7]],
    },
    {
        _id: '1',
        username: 'Alberto',
        name: 'Core Strength Beginner Workout',
        description:
            'A beginner-friendly workout to strengthen the core muscles.',
        exercises: [exercises[0], exercises[2], exercises[8], exercises[9]],
    },
    {
        _id: '1',
        username: 'Alberto',
        name: 'Empty Workout',
        exercises: [],
    },
];

export default workouts;
