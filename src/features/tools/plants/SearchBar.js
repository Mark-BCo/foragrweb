import { Icon } from '@iconify/react'
import { searchPlant } from '../../../app/api/plantSlice'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import React, { useState } from 'react';

// Seachbar function - export default
const SearchBar = ({ image }) => {

    // useState to update the state of the user input
    const [input, setInput] = useState('')
    // const [images, setImages] = useState([])

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
        path === '/Learn' && dispatch(searchPlant(input))
    }
    // Return and render the standard form
    return (
        <div className="grid place-content-center h-24 scale-150">
            <form className="" onSubmit={handleSearch}>
                <div className="">
                    <label htmlFor="plantsearch" className=""></label>
                    <input className="border rounded"
                        text="text"
                        type="search"
                        placeholder="Search for a plant or a location..."
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

export default SearchBar

// // this axios api call is from the unplash api - It will return the closest image to the user search parameter
//         // this could be imporved upon by getting user images and storing them in the database over time
//         // the aim is for the applications images and copyright would be owned by it's users
//         // is it possible to call this elsewhere
//         const {
//             data: { results },
//         } = await axios.get(
//             // the api url, requests an image from the user input, uses the access key and limits to 1 call per request
//             `/search/photos?query=${input}&client_id=${accessKey}&per_page=${perPage}&content_filter=high`  
//         );
//         if (results) {
//             setPerPage(2)
//         }

//         image = results

//         return image