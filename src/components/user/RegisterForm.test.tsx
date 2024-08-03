import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

const renderRegisterForm = () => {
    render(
        <Router>
            <RegisterForm />
        </Router>,
    );
};

const fillFormFields = async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
) => {
    const emailInput = screen.getByLabelText('Email');
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByText('Sign Up');

    await act(async () => {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(usernameInput, { target: { value: username } });
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.change(confirmPasswordInput, {
            target: { value: confirmPassword },
        });
        fireEvent.click(submitButton);
    });
};

describe('RegisterForm', () => {
    describe('when the form is rendered', () => {
        it('make sure that all fields are present', () => {
            renderRegisterForm();
            expect(screen.getByLabelText('Email')).toBeInTheDocument();
            expect(screen.getByLabelText('Username')).toBeInTheDocument();
            expect(screen.getByLabelText('Password')).toBeInTheDocument();
            expect(
                screen.getByLabelText('Confirm Password'),
            ).toBeInTheDocument();
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
                    'displays an error due to the username field being empty',
                message: 'Username is required',
            },
            {
                description:
                    'displays an error due to the password being empty',
                message: 'Password must be at least 12 characters',
            },
            {
                description:
                    'displays an error due to the confirm password field being empty',
                message: 'Confirm password is required',
            },
        ];

        errorCases.forEach(({ description, message }) => {
            it(description, async () => {
                renderRegisterForm();
                await fillFormFields('', '', '', '');
                expect(screen.getByText(message)).toBeInTheDocument();
            });
        });
    });

    describe('when the email is invalid', () => {
        it('displays an error message', async () => {
            renderRegisterForm();
            await fillFormFields(
                'testexample.com',
                'testuser',
                'passwordpassword123',
                'passwordpassword123',
            );
            expect(screen.getByText('Invalid email')).toBeInTheDocument();
        });
    });

    describe('when the username is longer than 16 characters', () => {
        it('displays an error message', async () => {
            renderRegisterForm();
            await fillFormFields(
                'testexample.com',
                'testutestusertestusertes',
                'passwordpassword123',
                'passwordpassword123',
            );
            expect(
                screen.getByText('Username must be less than 17 characters'),
            ).toBeInTheDocument();
        });
    });

    describe('when the password is shorter than 12 characters', () => {
        it('displays an error message', async () => {
            renderRegisterForm();
            await fillFormFields(
                'testexample.com',
                'testutestuser',
                'passwo',
                'passwordpassword123',
            );
            expect(
                screen.getByText('Password must be at least 12 characters'),
            ).toBeInTheDocument();
        });
    });

    describe('when the password is longer than 32 characters', () => {
        it('displays an error message', async () => {
            renderRegisterForm();
            await fillFormFields(
                'testexample.com',
                'testutestuser',
                'passwordpassword123passwordpassword123',
                'passwordpassword123',
            );
            expect(
                screen.getByText('Password must be less than 33 characters'),
            ).toBeInTheDocument();
        });
    });

    describe('when the passwords do not match', () => {
        it('displays an error message', async () => {
            renderRegisterForm();
            await fillFormFields(
                'test@example.com',
                'testuser',
                'passwordpassword123',
                'passwordpassword456',
            );
            expect(
                screen.getByText('Both passwords must be equal'),
            ).toBeInTheDocument();
        });
    });

    describe('when either the email or username already exists', () => {
        const errorCases = [
            {
                description: 'displays error if email already exists',
                errorResponse: {
                    errors: { emailInUse: 'Email is already in use' },
                },
                expectedError: 'Email is already in use',
            },
            {
                description: 'displays error if username already exists',
                errorResponse: {
                    errors: { usernameInUse: 'Username is already in use' },
                },
                expectedError: 'Username is already in use',
            },
        ];

        errorCases.forEach(({ description, errorResponse, expectedError }) => {
            it(description, async () => {
                const userData = {
                    email: 'test@example.com',
                    username: 'testuser',
                    password: 'password123password123',
                    confirmPassword: 'password123password123',
                };

                mock.onPost(
                    `${import.meta.env.VITE_SERVER_URI}/api/register`,
                    userData,
                ).reply(400, errorResponse);

                renderRegisterForm();
                await fillFormFields(
                    userData.email,
                    userData.username,
                    userData.password,
                    userData.confirmPassword,
                );

                expect(screen.getByText(expectedError)).toBeInTheDocument();
            });
        });
    });

    describe('when the data is correct', () => {
        it('make sure that the user is redirected to the Login page', async () => {
            const userData = {
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123password123',
                confirmPassword: 'password123password123',
            };

            mock.onPost(
                `${import.meta.env.VITE_SERVER_URI}/api/register`,
                userData,
            ).reply(200, {
                message: 'User created successfully',
            });

            renderRegisterForm();
            await fillFormFields(
                userData.email,
                userData.username,
                userData.password,
                userData.confirmPassword,
            );

            await new Promise(process.nextTick);

            expect(window.location.pathname).toBe('/');
        });
    });
});
