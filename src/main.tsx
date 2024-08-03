import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './routes/user/Home.tsx';
import Register from './routes/user/Register.tsx';
import LayoutAuthentication from './routes/user/LayoutAuthentication.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
