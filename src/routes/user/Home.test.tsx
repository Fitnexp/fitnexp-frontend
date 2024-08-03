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

describe('Register', () => {
    describe('when the Home page is rendered', () => {
        it('make sure that all elements are present', () => {
            renderHome();

            const placeholder = screen.getByRole('heading', {
                level: 1,
                name: 'This is a test project',
            });

            expect(placeholder).toBeInTheDocument();
        });
    });
});
