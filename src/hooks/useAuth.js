import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../app/api/authSlice"
import jwtDecode from 'jwt-decode'

// This hook allows to access the store state and current token to set user as required throughout the application
const useAuth = () => {

    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let isProfessional = false
    let isUser = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')
        isProfessional = roles.includes('Professional')
        isUser = roles.includes('User')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"
        if (isProfessional) status = "Professional"
        if (isUser) status = "User"

        return { username, roles, status, isManager, isAdmin, isProfessional, isUser}
    }

    return { username: '', roles: [], isManager, isAdmin, isProfessional, isUser, status }
}
export default useAuth