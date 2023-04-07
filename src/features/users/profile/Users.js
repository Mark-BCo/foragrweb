import { useNavigate } from "react-router-dom"
import { useGetUsersQuery } from "../../../app/api/usersApiSlice"
import { memo } from 'react'
import React from "react"
import useAuth from "../../../hooks/useAuth"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../../app/api/authSlice"
import jwtDecode from "jwt-decode"

const UserProfile = ({ userId }) => {

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    // console.log(user)

    const { isUser, isProfessional } = useAuth()

    const token = useSelector(selectCurrentToken)

    const decoded = jwtDecode(token)

    const { username } = decoded.UserInfo

    const navigate = useNavigate()

    // console.log(userId)

    if (isUser || isProfessional) {

        if (user.username === username) {

            const handleEdit = () => navigate(`/dash/userprofile/${userId}`)

            return (
                <>
                    <div className="grid place-content-center min-h-screen">
                        <div className="border rounded shadow-2xl text-black bg-shamrock bg-opacity-30">
                            <div className="p-4" key={userId}>
                                <div className="">
                                    <div className="px-4 pb-2">
                                        <div className="flex bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">Username: {user.username}</div>
                                    </div>
                                    <div className="px-4 pb-2">
                                        <div className="flex bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">First Name: {user.firstname}</div>
                                    </div>
                                    <div className="px-4 pb-2">
                                        <div className=" bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">Last Name: {user.lastname}</div>
                                    </div>
                                    <div className="px-4 pb-2">
                                        <div className=" bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">Email: {user.email}</div>
                                    </div>
                                    <div className="flex place-content-center px-4 pb-2">
                                        <button className="border rounded-md mt-4 p-2 hover:bg-cugreen hover:text-white" onClick={handleEdit}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else return null
    }
}

const memoizedUser = memo(UserProfile)

export default memoizedUser

