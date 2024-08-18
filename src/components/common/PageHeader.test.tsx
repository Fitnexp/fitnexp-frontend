import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageHeader from './PageHeader';

function renderPageHeader() {
    render(
        <BrowserRouter>
            <PageHeader
                title={'Test Header'}
                icon={undefined}
                onChange={() => {}}
                placeholder={'Search'}
            />
        </BrowserRouter>,
    );
}

describe('PageHeader', () => {
    describe('when the PageHeader is rendered', async () => {
        it('make sure it is rendered and it works properly', async () => {
            renderPageHeader();

            const searchBar = screen.getByText('Test Header');
            expect(searchBar).toBeInTheDocument();
        });
    });
});
