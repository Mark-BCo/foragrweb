import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import React from "react"
// This directs the user to login page if they are not administered to do so
const RequireAuth = ({ allowedRoles }) => {

    const location = useLocation()
    const { roles } = useAuth()

    const content = (
        roles.some(role => allowedRoles.includes(role)) ? <Outlet /> : <Navigate to="/Login" state={{ from: location }} replace />
    )
    
    return content
}
export default RequireAuth