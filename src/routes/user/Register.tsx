import RegisterForm from '@/components/user/RegisterForm';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Register() {
    useEffect(() => {
        document.title = 'Fitnexp - Sign Up';
    }, []);

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <h2 className="text-balance text-muted-foreground">
                    Create an account in a few steps
                </h2>
            </div>
            <RegisterForm />
            <div className="mt-4 text-center text-sm">
                Have an account?{' '}
                <Link to=".." className="underline">
                    Log in
                </Link>
            </div>
        </>
    );
}

export default Register;
