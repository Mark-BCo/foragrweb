import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSendLogoutMutation } from '../../app/api/authApiSlice'
import useAuth from '../../hooks/useAuth'
import React from "react"
import { useState } from 'react';

const ForHeader = ({ userId }) => {

    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(false);


    const { username, isManager, isAdmin, isProfessional } = useAuth()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const handleEdit = () => navigate(`/dash/users/${userId}`)

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    const logoutButton = (
        <>
            <button id="text" className="flex items-center px-3 py-2 rounded text-4xl" >
                <Icon icon="carbon:logout"
                    color="darkgreen"
                    onClick={() => {sendLogout(); setShowSidebar(!showSidebar)}}  />
            </button>
            <p className="text-xl text-center">Logout</p>
        </>
    )

    const userHome = (
        <>
            <li className="px-1">
                <Link className="" to='/dash' key={userId} onClick={handleEdit}>
                    <button className="px-3 py-2 rounded text-4xl" onClick={() => setShowSidebar(!showSidebar)}><Icon icon="file-icons:leaflet" color="darkgreen" rotate={1} /></button>
                    <p className="text-xl text-center">Home</p>
                </Link>
            </li>
        </>
    )

    const content = (
        <>
            {showSidebar ? (
                <>
                    <button
                        className="flex text-4xl items-center cursor-pointer fixed right-11 top-6 z-50"
                        onClick={() => setShowSidebar(!showSidebar)}>
                        x
                    </button>

                </>
            ) : (
                <>
                    <svg onClick={() => setShowSidebar(!showSidebar)}
                        className="fixed flex items-center cursor-pointer right-10 top-10"
                        viewBox="0 0 100 80"
                        width="20"
                        height="20">
                        <rect width="100" height="10"></rect>
                        <rect y="30" width="100" height="10"></rect>
                        <rect y="60" width="100" height="10"></rect>
                    </svg>
                </>
            )}

            <div className={`top-0 right-0 p-4 pl-5 bg-blugray border rounded-bl-lg fixed z-40 ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "translate-x-full"}`}>
                <div className="grid place-content-center px-3 py-2">
                    <ul className="flex flex-col">
                        {(username || isManager || isProfessional || isAdmin) && <div>{userHome}</div>}
                        {(!username) && <li className="px-1">
                            <Link className="" to='/' onClick={() => setShowSidebar(!showSidebar)}>
                                <button id="text " className="px-3 py-2 rounded text-4xl"><Icon icon="file-icons:leaflet" color="darkgreen" rotate={1} /></button>
                                <p className="text-xl text-center">Home</p>
                            </Link>
                        </li>}
                        <li className="px-1">
                            <Link className="" to='../Learn' onClick={() => setShowSidebar(!showSidebar)}>
                                <button className="px-3 py-2 rounded text-4xl"><Icon icon="ion:school-outline" color="darkgreen" /></button>
                                <p className="text-xl text-center">Learn</p>
                            </Link>
                        </li>
                        <li className="px-1">
                            <Link className="" to='../Map' onClick={() => setShowSidebar(!showSidebar)}>
                                <button className="px-3 py-2 rounded text-4xl"><Icon icon="gis:pirate-map" color="darkgreen" />
                                </button>
                                <p className="text-xl text-center">Map</p>
                            </Link>
                        </li>
                        <li className="px-1">
                            <Link className="" to='../Partners' onClick={() => setShowSidebar(!showSidebar)}>
                                <button className="px-3 py-2 rounded text-5xl"><Icon icon="healthicons:community-meeting" color="darkgreen" />
                                </button>
                                <p className="text-xl text-center">Community</p>
                            </Link>
                        </li>
                        {(!username) && <li className="px-1">
                            <Link className="" to='../Register' onClick={() => setShowSidebar(!showSidebar)}>
                                <button className="px-3 py-2 rounded text-4xl"><Icon icon="akar-icons:person-check" color="darkgreen" />
                                </button>
                                <p className="text-xl text-center">Register</p>
                            </Link>
                        </li>}
                        {/* {(!username) && <li className="px-1">
                            <Link className="" to='../ProRegister' onClick={() => setShowSidebar(!showSidebar)}>
                                <button className="px-3 py-2 rounded text-4xl"><Icon icon="uiw:usergroup-add" color="darkgreen" />
                                </button>
                                <p className="text-xl text-center">Group <br />Register</p>
                            </Link>
                        </li>} */}
                        {(!username) && <li className="px-1" >
                            <Link className="" to='../Login' onClick={() => setShowSidebar(!showSidebar)}>
                                <button className="px-3 py-2 rounded text-4xl"><Icon icon="carbon:login" color="darkgreen" /></button>
                                <p className="text-xl text-center">Login</p>
                            </Link>
                        </li>}
                        {(username) && <div>{logoutButton}</div>}
                    </ul>
                </div>
            </div>
        </>

    )
    return content
}

export default ForHeader