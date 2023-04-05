import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from '../../../app/api/usersApiSlice'
import EditUsersForm from './for-userNavigate'
import React from "react"


const EditUser = () => {
    
    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id))

    const content = user ? <EditUsersForm user={user} /> : <p>Loading...</p>

    return content
}
export default EditUser