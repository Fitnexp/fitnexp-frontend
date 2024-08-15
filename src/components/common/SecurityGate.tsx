import { cloneElement, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SecurityGate = ({ children }: { children: JSX.Element }) => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_SERVER_URI}/api/loggedUser`, {
                withCredentials: true,
            })
            .then((res) => setUsername(res.data.username))
            .then(() => setLoading(false))
            .catch(() => navigate('/'));
    }, [children, navigate]);

    return loading ? <></> : cloneElement(children, { username });
};

export default SecurityGate;
