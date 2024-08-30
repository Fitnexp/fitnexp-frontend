import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './routes/user/Home.tsx';
import Register from './routes/user/Register.tsx';
import LayoutAuthentication from './routes/user/LayoutAuthentication.tsx';
import SecurityGate from './components/common/SecurityGate.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutNavBar from './components/common/LayoutNavBar.tsx';
import Workouts from '@/routes/workout/Workouts.tsx';
import Workout from './routes/workout/Workout.tsx';
import WorkoutStart from './routes/workout/start/WorkoutStart.tsx';
import Profile from '@/routes/user/Profile.tsx';
import Exercises from '@/routes/exercise/Exercises.tsx';
import Exercise from './routes/exercise/Exercise.tsx';
import ErrorPage from './components/common/ErrorPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutAuthentication />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/sign-up',
                element: <Register />,
            },
        ],
        errorElement: <ErrorPage url={'/'} />,
    },
    {
        path: '/',
        element: <SecurityGate children={<LayoutNavBar username={''} />} />,
        children: [
            {
                path: '/exercises',
                element: <Exercises />,
            },
            {
                path: '/exercise/:id',
                element: <Exercise />,
            },
            {
                path: '/workouts',
                element: <Workouts />,
            },
            {
                path: '/workout/:id',
                element: <Workout />,
            },
            {
                path: '/profile',
                element: <Profile />, // Use the imported Profile component
            },
        ],
        errorElement: <ErrorPage url={'/workouts'} />,
    },
    {
        path: '/workout/:id/start',
        element: <SecurityGate children={<WorkoutStart />} />,
        errorElement: <ErrorPage url={'/workouts'} />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
