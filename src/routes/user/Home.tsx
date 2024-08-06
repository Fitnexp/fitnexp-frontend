import LoginForm from '@/components/user/LoginForm';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {
    useEffect(() => {
        document.title = 'Fitnexp - Login';
    }, []);

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold">Log In</h1>
                <h2 className="text-balance text-muted-foreground">
                    Enter your email below to log in to your account
                </h2>
            </div>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
                Don’t have an account?{' '}
                <Link to="/sign-up" className="underline">
                    Sign up
                </Link>
            </div>
        </>
    );
}

export default App;
