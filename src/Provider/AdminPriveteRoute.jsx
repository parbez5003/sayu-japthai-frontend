import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useCurrentUser from '../Hooks/useCurrentUser';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Shared/Loading/Loading';

export default function AdminPriveteRoute({ children }) {
    
    const { user, isLoading } = useAuth();
    const { currentUser, userLoading } = useCurrentUser();
    const location = useLocation();

    // Check if the current user is an admin
    const isAdmin = currentUser?.isAdmin;

    if (isLoading || userLoading) {
        return (
            < div className="flex items-center justify-center min-h-screen" >
                <Loading />
            </div >
        )
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
}
