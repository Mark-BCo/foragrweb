import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSendLogoutMutation } from '../../app/api/authApiSlice'
import useAuth from '../../hooks/useAuth'
import React from "react"

const ForHeader = ({userId}) => {

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
                    onClick={sendLogout} />
            </button>
            <p className="text-xl text-center">Logout</p>
        </>
    )

    const userHome = (
        <>
            <li className="px-1">
                <Link className="" to='/dash' key={userId} onClick={handleEdit}>
                    <button className="px-3 py-2 rounded text-4xl"><Icon icon="file-icons:leaflet" color="darkgreen" rotate={1} /></button>
                    <p className="text-xl text-center">Home</p>
                </Link>
            </li>
        </>
    )

    const content = (
        <>
            <div className="grid place-content-center px-3 py-2">
                <ul className="flex flex-col">
                {(username || isManager || isProfessional || isAdmin) && <div>{userHome}</div>}
                {(!username) && <li className="px-1">
                        <Link className="" to='/'>
                            <button id="text "className="px-3 py-2 rounded text-4xl"><Icon icon="file-icons:leaflet" color="darkgreen" rotate={1} /></button>
                            <p className="text-xl text-center">Home</p>
                        </Link>
                    </li>}
                    <li className="px-1">
                        <Link className="" to='../Learn'>
                            <button className="px-3 py-2 rounded text-4xl"><Icon icon="ion:school-outline" color="darkgreen" /></button>
                            <p className="text-xl text-center">Learn</p>
                        </Link>
                    </li>
                    <li className="px-1">
                        <Link className="" to='../Map'>
                            <button className="px-3 py-2 rounded text-4xl"><Icon icon="gis:pirate-map" color="darkgreen" />
                            </button>
                            <p className="text-xl text-center">Map</p>
                        </Link>
                    </li>
                    <li className="px-1">
                        <Link className="" to='../Partners'>
                            <button className="px-3 py-2 rounded text-5xl"><Icon icon="healthicons:community-meeting" color="darkgreen" />
                            </button>
                            <p className="text-xl text-center">Community</p>
                        </Link>
                    </li>
                    {(!username) && <li className="px-1">
                        <Link className="" to='../Register'>
                            <button className="px-3 py-2 rounded text-4xl"><Icon icon="akar-icons:person-check" color="darkgreen" />
                            </button>
                            <p className="text-xl text-center">Register</p>
                        </Link>
                    </li>}
                    {(!username) && <li className="px-1">
                        <Link className="" to='../ProRegister'>
                            <button className="px-3 py-2 rounded text-4xl"><Icon icon="uiw:usergroup-add" color="darkgreen" />
                            </button>
                            <p className="text-xl text-center">Group <br />Register</p>
                        </Link>
                    </li>}
                    {(!username) && <li className="px-1">
                        <Link className="" to='../Login'>
                            <button className="px-3 py-2 rounded text-4xl"><Icon icon="carbon:login" color="darkgreen" /></button>
                            <p className="text-xl text-center">Login</p>
                        </Link>
                    </li>}
                    {(username) && <div>{logoutButton}</div>}
                </ul>
            </div>

        </>
    )
    return content
}

export default ForHeader