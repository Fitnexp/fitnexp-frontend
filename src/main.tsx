import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './routes/user/Home.tsx';
import Register from './routes/user/Register.tsx';
import LayoutAuthentication from './routes/user/LayoutAuthentication.tsx';
import SecurityGate from './components/common/SecurityGate.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutNavBar from './components/common/LayoutNavBar.tsx';
import Exercise from '@/routes/exercise/Exercise.tsx';
import Workouts from '@/routes/workout/Workouts.tsx';
import Workout from './routes/workout/Workout.tsx';

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
    },
    {
        path: '/',
        element: <SecurityGate children={<LayoutNavBar username={''} />} />,
        children: [
            {
                path: '/exercises',
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
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
