import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LayoutNavBar from './LayoutNavBar';

function renderLayoutNavBar() {
    render(
        <BrowserRouter>
            <LayoutNavBar username={'Laura'} />
        </BrowserRouter>,
    );
}
describe('LayoutNavBar', () => {
    describe('when the LayoutNavBar is rendered', async () => {
        it('make sure it is rendered and it works properly', async () => {
            renderLayoutNavBar();

            const navsBar = screen.getAllByText('Laura');
            expect(navsBar).toHaveLength(2);
        });
    });
});
