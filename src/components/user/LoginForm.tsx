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
    password: z
        .string({ message: 'Password is required' })
        .min(12, { message: 'Password must be at least 12 characters' })
        .max(32, {
            message: 'Password must be less than 33 characters',
        }),
});

function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setError(null);
        axios
            .post(`${import.meta.env.VITE_SERVER_URI}/api/login`, values, {
                withCredentials: true,
            })
            .then(() => navigate('/protected'))
            .catch((err) => {
                setError(Object.values(err.response.data.errors)[0] as string);
            });
    };

    return (
        <Form {...form}>
            <form
                className="w-2/3 max-w-[500px]"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormFieldComponent name="email" label="Email" />
                <FormFieldComponent
                    name="password"
                    label="Password"
                    type="password"
                />
                {error && (
                    <h3 id="error" className="text-red-500">
                        {error}
                    </h3>
                )}
                <Button type="submit" className="mt-2 w-full">
                    Log In
                </Button>
            </form>
        </Form>
    );
}

export default LoginForm;
