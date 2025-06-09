import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import Loading from './Loading'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        // Redirect to login page with return url
        return <Navigate to="/auth/login" state={{ from: location }} replace />
    }

    return children
}

export default PrivateRoute
