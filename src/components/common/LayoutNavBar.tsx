import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function LayoutNavBar({ username }: { readonly username: string }) {
    return (
        <main className="m-auto flex w-full flex-col xl:w-3/4 xl:flex-row xl:gap-10">
            <NavBar username={username} />
            <Outlet />
        </main>
    );
}

export default LayoutNavBar;
