import { useEffect } from 'react';

function App() {
    useEffect(() => {
        document.title = 'Fitnexp - Login';
    }, []);

    return <h1>This is a test project</h1>;
}

export default App;
