import React from 'react'
import Loading from '../Components/Shared/Loading/Loading';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useCurrentUser from '../Hooks/useCurrentUser';

export default function PrivateRoute({children}) {

    const { currentUser } = useCurrentUser()
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            < div className="flex items-center justify-center min-h-screen" >
                <Loading />
            </div >
        )
    }
    if (user && currentUser) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
}
