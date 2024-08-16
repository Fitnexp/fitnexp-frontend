import { expect, describe, it, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavItem from './NavItem';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

const renderNavItem = ({
    link = '',
    text,
}: {
    link?: string;
    text: string;
}) => {
    render(
        <BrowserRouter>
            <NavItem link={link} text={text} />
        </BrowserRouter>,
    );
};

describe('NavItem', () => {
    beforeEach(() => {
        mock.reset();
    });
    describe('when the NavItem is rendered', () => {
        it('make sure it is rendered and it works properly', async () => {
            const navLinks = [
                { link: '/profile', text: 'Laura' },
                { link: '/workouts', text: 'Workouts' },
                { link: '/exercises', text: 'Exercises' },
                { link: '/', text: 'Log Out' },
            ];

            mock.onPost(
                `${import.meta.env.VITE_SERVER_URI}/api/logout`,
                {},
            ).reply(200);

            for (const navLink of navLinks) {
                renderNavItem(navLink);

                const navLinkElement = screen.getByText(navLink.text);
                expect(navLinkElement).toBeInTheDocument();
                expect(navLinkElement).toHaveTextContent(navLink.text);
                fireEvent.click(navLinkElement);
                await waitFor(() => {
                    expect(window.location.pathname).toBe(navLink.link);
                });
            }

            renderNavItem({ text: 'Test' });
            expect(screen.getByText('Test')).toBeInTheDocument();
        });
    });
});
