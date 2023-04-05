import { Icon } from '@iconify/react'
import { useState } from 'react'
import { searchUser } from '../../app/api/userSlice'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import React from "react"


// Seachbar function - export default
const UserSearchBar = () => {

    // useState to update the state of the user input
    const [input, setInput] = useState('')


    /* The useLocation hook will return the url path name to be used 
       when the action creator is called via the react-redux dispatch function */
    const location = useLocation()

    // The pathname constant
    const path = location.pathname

    // The dispatch constant
    const dispatch = useDispatch()

    /* The handleSearch function includes the path, the dispatch and the action creator
       to be called when the form is submitted */
    const handleSearch = async (e) => {

        // prevent the default event from happening when the user inputs and only change when the form is submitted
        e.preventDefault()

        // path and dispatch the action creator
        path === '/dash/users' && dispatch(searchUser(input))

    }

    // Return and render the standard form
    return (
        <div className="grid place-content-center h-24 scale-150">
        <form className="" onSubmit={handleSearch} >
            <div className="">
                <label htmlFor="usersearch" className=""></label>
                <input className="border rounded"
                    text="text"
                    type="search"
                    placeholder="Search for a user by username"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} />
                <button type="submit" className="ml-2 scale-125 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" >
                    <Icon icon="file-icons:leaflet" className="" color="darkgreen" rotate={1} />
                </button>
            </div>
        </form>
        </div>
    )
}

export default UserSearchBar