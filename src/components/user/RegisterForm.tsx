import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import FormFieldComponent from './FormFieldComponent';
import axios from 'axios';

const formSchema = z.object({
    email: z.string({ message: 'Email is required' }).email(),
    username: z
        .string({ message: 'Username is required' })
        .min(1, { message: 'Username is required' })
        .max(16, {
            message: 'Username must be less than 17 characters',
        })
        .trim(),
    password: z
        .string({ message: 'Password is required' })
        .min(12, { message: 'Password must be at least 12 characters' })
        .max(32, {
            message: 'Password must be less than 33 characters',
        }),
    confirmPassword: z
        .string({ message: 'Confirm password is required' })
        .min(1, { message: 'Confirm password is required' }),
});

function RegisterForm() {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (values.password !== values.confirmPassword) {
            setError('Both passwords must be equal');
            return;
        }
        setError(null);
        axios
            .post(`${import.meta.env.VITE_SERVER_URI}/api/register`, values)
            .then(() => navigate('/'))
            .catch((err) =>
                setError(Object.values(err.response.data.errors)[0] as string),
            );
    };

    return (
        <Form {...form}>
            <form
                className="w-2/3 max-w-[500px]"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormFieldComponent name="email" label="Email" />
                <FormFieldComponent name="username" label="Username" />
                <FormFieldComponent
                    name="password"
                    label="Password"
                    type="password"
                />
                <FormFieldComponent
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                />
                {error && (
                    <h3 id="error" className="text-red-500">
                        {error}
                    </h3>
                )}
                <Button type="submit" className="mt-2 w-full">
                    Sign Up
                </Button>
            </form>
        </Form>
    );
}

export default RegisterForm;
