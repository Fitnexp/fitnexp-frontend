import { Search } from 'lucide-react';

function SearchBar({
    onChange,
    placeholder,
}: {
    readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly placeholder: string;
}) {
    return (
        <div className="fixed bottom-0 w-full bg-white px-4 py-4 xl:relative">
            <Search className="z-1 absolute left-6 top-6"></Search>
            <input
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-full border border-gray-300 p-2 pl-10"
            ></input>
        </div>
    );
}

export default SearchBar;
