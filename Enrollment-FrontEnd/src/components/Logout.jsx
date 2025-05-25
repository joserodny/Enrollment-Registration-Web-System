import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const LogoutButton = () => {
    const handleLogout = () => {
        const token = localStorage.getItem('auth_token');

        axios.post(`${apiUrl}/api/logout`, {}, {
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
            window.location.href = '/';
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
