import gym from '../../assets/user/gym.avif';
import { Outlet } from 'react-router-dom';

function LayoutAuthentication() {
    return (
        <main className="w-screen">
            <div className="flex h-screen flex-col items-center justify-center gap-4 bg-white lg:w-1/2">
                <Outlet />
            </div>
            <img
                src={gym}
                alt="Authentication page background gym"
                loading="lazy"
                className="absolute right-0 top-0 -z-10 hidden h-screen object-cover lg:block"
            />
        </main>
    );
}

export default LayoutAuthentication;
