import SearchBar from './SearchBar';

function PageHeader({
    title,
    icon,
    onChange,
    placeholder,
    children = null,
}: {
    readonly title: string;
    readonly icon: React.ReactNode;
    readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly placeholder: string;
    readonly children?: React.ReactNode;
}) {
    return (
        <div className="relative bottom-0 z-10 flex flex-col xl:sticky xl:top-0">
            <h1 className="hidden w-full items-center gap-4 bg-white px-8 pb-4 pt-8 text-5xl font-bold xl:flex">
                {icon} {title}
            </h1>
            <SearchBar onChange={onChange} placeholder={placeholder} />
            {children}
        </div>
    );
}

export default PageHeader;
