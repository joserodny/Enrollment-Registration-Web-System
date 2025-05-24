import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
    const handleLogout = () => {
        const token = localStorage.getItem('auth_token');

        axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        })
        .then(() => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_role');
            window.location.href = '/';
        })
        .catch(() => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_role');
            window.location.href = '/Login';
        });
    };

    return (
        <button
        onClick={handleLogout}
        className="cursor-pointer py-2 inline-block text-white px-2 font-semibold"
        >
        Logout
        </button>
    );
};

export default LogoutButton;
