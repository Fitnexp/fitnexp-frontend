import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '@/routes/user/Home';

const renderHome = () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>,
    );
};

describe('Home', () => {
    describe('when the Home page is rendered', () => {
        it('make sure that all elements are present', () => {
            renderHome();

            const logInHeading = screen.getByRole('heading', {
                level: 1,
                name: 'Log In',
            });
            const logInSubHeading = screen.getByRole('heading', {
                level: 2,
                name: 'Enter your email below to log in to your account',
            });
            const signUpButton = screen.getByRole('link', {
                name: 'Sign up',
            });

            expect(logInHeading).toBeInTheDocument();
            expect(logInSubHeading).toBeInTheDocument();
            expect(signUpButton).toBeInTheDocument();
        });
    });
});
