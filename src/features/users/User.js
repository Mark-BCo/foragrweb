import { useNavigate } from "react-router-dom"
import { useGetUsersQuery } from "../../app/api/usersApiSlice"
import { memo } from 'react'
import React from "react"

const User = ({ userId }) => {

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    const navigate = useNavigate()

    if (user) {

        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ') 

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr>
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{user.firstname}</td>
                <td className={`table__cell ${cellStatus}`}>{user.lastname}</td>
                <td className={`table__cell ${cellStatus}`}>{user.email}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}><button onClick={handleEdit}>Edit</button></td>
            </tr>
        )
    } else return null
}

const memoizedUser = memo(User)

export default memoizedUser

