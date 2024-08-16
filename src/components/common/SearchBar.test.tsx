import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from './SearchBar';

function renderSearchBar() {
    render(
        <BrowserRouter>
            <SearchBar onChange={() => {}} placeholder={'Test'} />
        </BrowserRouter>,
    );
}

describe('SearchBar', () => {
    describe('when the SearchBar is rendered', async () => {
        it('make sure it is rendered and it works properly', async () => {
            renderSearchBar();

            const searchBar = screen.getByPlaceholderText('Test');
            expect(searchBar).toBeInTheDocument();
        });
    });
});
