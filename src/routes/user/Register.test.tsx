import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '@/routes/user/Register';

const renderRegister = () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>,
    );
};

describe('Register', () => {
    describe('when the Register page is rendered', () => {
        it('make sure that all elements are present', () => {
            renderRegister();

            const signUpHeading = screen.getByRole('heading', {
                level: 1,
                name: 'Sign Up',
            });
            const signUpSubHeading = screen.getByRole('heading', {
                level: 2,
                name: 'Create an account in a few steps',
            });
            const loginButton = screen.getByRole('link', {
                name: 'Login',
            });

            expect(signUpHeading).toBeInTheDocument();
            expect(signUpSubHeading).toBeInTheDocument();
            expect(loginButton).toBeInTheDocument();
        });
    });
    describe('when the Login link is clicked', () => {
        it('redirects the user to the Login page', () => {
            renderRegister();

            const loginButton = screen.getByRole('link', {
                name: 'Login',
            });

            loginButton.click();

            expect(window.location.pathname).toBe('/');
        });
    });
});
