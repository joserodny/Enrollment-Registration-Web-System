import { Navigate } from 'react-router-dom';

export const GuestRoute = ({ children }) => {
    const token = localStorage.getItem('auth_token');
    return token ? <Navigate to="/Dashboard" /> : children;
};