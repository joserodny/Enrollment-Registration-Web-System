import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('auth_token');
    return token ? children : <Navigate to="/Login" />;
};