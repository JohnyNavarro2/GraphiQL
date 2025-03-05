// src/components/Login.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';


// Define un tipo específico que enumere las claves permitidas y sus estructuras
interface Users {
    [key: string]: { password: string };
}

// Declara el objeto 'users' usando el tipo definido
const users: Users = {
    User1: { password: "password1" },
    User2: { password: "password2" }
};

const Login: React.FC<{ onLogin: (username: string) => void }> = ({ onLogin }) => {
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (users[user] && users[user].password === password) {
            onLogin(user);
            navigate('/'); // Redireccionar a la página inicial después del login
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                <label style={{ marginBottom: '10px' }}>
                    Username:
                    <input type="text" placeholder="Username" value={user} onChange={e => setUser(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '8px' }} />
                </label>
                <label style={{ marginBottom: '10px' }}>
                    Password:
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '8px' }} />
                </label>
                <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
                    Login
                </button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
