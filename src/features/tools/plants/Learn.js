import PlantFinal from './PlantFinal'
import React from "react"
import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'

const Learn = () => {

    const {isAdmin, isProfessional, isManager, isUser} = useAuth()

    if (isAdmin || isUser || isProfessional || isManager) {
        return (
            <PlantFinal />
        )
    } else {
        return (
            <Link className="grid place-content-center text-center antialiased min-h-screen text-2xl font-bold hover:bg-cugreen transition ease-in duration-300 hover:text-white" to="/Login">Sorry, you must be logged in to view this page.</Link>        
            )
    }
}
export default Learn