import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { authToken } = useAuth();

    const isProtectedRoute = window.location.pathname === '/login' || window.location.pathname === '/cadastro';

    if (isProtectedRoute && authToken) {
        return <Navigate to="/home" />;
    }

    if (!authToken && !isProtectedRoute) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
