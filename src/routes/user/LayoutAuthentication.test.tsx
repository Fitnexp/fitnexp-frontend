import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LayoutAuthentication from '@/routes/user/LayoutAuthentication';

const renderLayoutAuthentication = () => {
    render(
        <BrowserRouter>
            <LayoutAuthentication />
        </BrowserRouter>,
    );
};

describe('LayoutAuthetication', () => {
    describe('when the LayoutAuthetication page is rendered', () => {
        it('make sure that the image is present', () => {
            renderLayoutAuthentication();

            const image = screen.getByRole('img', {
                name: 'Authentication page background gym',
            });

            expect(image).toBeInTheDocument();
        });
    });
});
