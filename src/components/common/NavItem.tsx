import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Book, LogOut, User } from 'lucide-react';
import axios from 'axios';

function getIcon(text: string) {
    const defaultIconProps = {
        size: 32,
    };

    const iconMap: { [key: string]: JSX.Element } = {
        Profile: <User {...defaultIconProps} />,
        Workouts: <Dumbbell {...defaultIconProps} />,
        Exercises: <Book {...defaultIconProps} />,
        'Log Out': <LogOut {...defaultIconProps} />,
    };

    return iconMap[text] || iconMap['Profile'];
}

function LogOutNavItem({ text }: { readonly text: string }) {
    const navigate = useNavigate();

    const onClick = () => {
        axios
            .post(
                `${import.meta.env.VITE_SERVER_URI}/api/logout`,
                {},
                {
                    withCredentials: true,
                },
            )
            .then(() => navigate('/'));
    };

    return (
        <button
            className={`flex items-center gap-4 p-4 text-2xl text-red-400 hover:bg-slate-200`}
            onClick={onClick}
        >
            {getIcon(text)}
            <span className="w-full text-left">{text}</span>
        </button>
    );
}

function UsualNavItem({
    link,
    text,
}: {
    readonly link: string;
    readonly text: string;
}) {
    const isActive = location.pathname.includes(link);
    return (
        <Link
            to={link}
            className={`flex items-center gap-4 p-4 text-2xl hover:bg-slate-200 ${isActive ? 'bg-slate-200' : ''}`}
        >
            {getIcon(text)}
            <span className="w-full">{text}</span>
        </Link>
    );
}

function NavItem({
    link,
    text,
}: {
    readonly link: string;
    readonly text: string;
}) {
    if (text === 'Log Out') {
        return <LogOutNavItem text={text} />;
    }

    return <UsualNavItem text={text} link={link} />;
}

export default NavItem;
