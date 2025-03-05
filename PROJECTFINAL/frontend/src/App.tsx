import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import PublicacionList from './pages/PublicacionList';
import RequisicionForm from './pages/RequisicionForm';
import RequisicionList from './pages/RequisicionList';
import RequisicionListRRHH from './pages/RequisicionListRRHH';

const App: React.FC = () => {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogin = (username: string) => {
        setUser(username);
        localStorage.setItem('user', username);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <div>
                {user && <button onClick={handleLogout}>Salir</button>}
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/" element={!user ? <Navigate to="/login" /> : (user === 'User1' ? <Navigate to="/user1" /> : <Navigate to="/user2" />)} />
                    <Route path="/user1" element={user === 'User1' ? <User1Pages /> : <Navigate to="/login" />} />
                    <Route path="/user2" element={user === 'User2' ? <User2Pages /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

const User1Pages: React.FC = () => {
    return (
        <>
            <PublicacionList />
            <RequisicionListRRHH />
        </>
    );
};

const User2Pages: React.FC = () => {
    return (
        <>
            <RequisicionForm />
            <RequisicionList />
        </>
    );
};

export default App;
