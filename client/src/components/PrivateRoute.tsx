import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
    component: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
    const { user } = useAuth();

    // if (!user) {
    //     return <Navigate to="/login" />;
    // }

    return <>{component}</>;
};

export default PrivateRoute;
