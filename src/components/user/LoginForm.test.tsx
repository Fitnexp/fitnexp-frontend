import {
    render,
    screen,
    fireEvent,
    act,
    waitFor,
} from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './LoginForm';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

const userData = {
    email: 'test@example.com',
    password: 'password123password123',
};

const renderLoginForm = () => {
    render(
        <Router>
            <LoginForm />
        </Router>,
    );
};

const fillFormFields = async (email: string, password: string) => {
    renderLoginForm();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Log In');

    await act(async () => {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.click(submitButton);
    });
};

describe('LoginForm', () => {
    beforeEach(() => {
        mock.reset();
    });
    describe('when the form is rendered', () => {
        it('make sure that all fields are present', () => {
            renderLoginForm();
            expect(screen.getByLabelText('Email')).toBeInTheDocument();
            expect(screen.getByLabelText('Password')).toBeInTheDocument();
        });
    });

    describe('whent the input fields are empty', () => {
        const errorCases = [
            {
                description:
                    'displays an error due to the email field being empty',
                message: 'Invalid email',
            },

            {
                description:
                    'displays an error due to the password being empty',
                message: 'Password must be at least 12 characters',
            },
        ];

        errorCases.forEach(({ description, message }) => {
            it(description, async () => {
                await fillFormFields('', '');
                expect(screen.getByText(message)).toBeInTheDocument();
            });
        });
    });

    const errorCases = [
        {
            description: 'when the email is invalid',
            userData: { ...userData, email: 'test' },
            expectedMessage: 'Invalid email',
        },

        {
            description: 'when the password is shorter than 12 characters',
            userData: { ...userData, password: 'passwo' },
            expectedMessage: 'Password must be at least 12 characters',
        },
        {
            description: 'when the password is longer than 32 characters',
            userData: {
                ...userData,
                password: 'passwordpassword123passwordpassword123',
            },
            expectedMessage: 'Password must be less than 33 characters',
        },
    ];

    errorCases.forEach(({ description, userData, expectedMessage }) => {
        describe(description, () => {
            it('displays an error message', async () => {
                await fillFormFields(userData.email, userData.password);
                expect(screen.getByText(expectedMessage)).toBeInTheDocument();
            });
        });
    });

    describe('when the credentials do not match any user in the database', () => {
        it('shows an error message', async () => {
            mock.onPost(`${import.meta.env.VITE_SERVER_URI}/api/login`, {
                email: userData.email,
                password: userData.password,
            }).reply(400, {
                errors: {
                    incorrectCredentials: 'Email or password is incorrect',
                },
            });

            await fillFormFields(userData.email, userData.password);

            await waitFor(() => {
                expect(
                    screen.getByText('Email or password is incorrect'),
                ).toBeInTheDocument();
            });
        });
    });

    describe('when the credentials match a user in the database', () => {
        it('redirects the user to another page', async () => {
            mock.onPost(`${import.meta.env.VITE_SERVER_URI}/api/login`, {
                email: userData.email,
                password: userData.password,
            }).reply(200, {
                message: 'User logged in successfully',
            });

            await fillFormFields(userData.email, userData.password);

            await waitFor(() => {
                expect(window.location.pathname).toBe('/workouts');
            });
        });
    });
});
