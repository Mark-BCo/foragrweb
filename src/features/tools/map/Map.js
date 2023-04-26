import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from 'leaflet'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Instruction from './MapInstructions';
import useAuth from '../../../hooks/useAuth'

const Map = () => {

    const { isAdmin, isProfessional, isManager, isUser } = useAuth()

    const position = [54.714, -6.239]
    const [markerData, setMarkerData] = useState([]);

    // Customer Marker
    // Goal:
    // 1. Get Coordinates when user clicks on map [x]
    // 2. POST coordinates to the database (Location Schema) [x]
    // 3. GET coordinates from the databse (Location Schema) [x]
    // 4. Persist new marker on the map from GET request [x]
    // 5. Make the marker draggable to users desired loaction []
    // 6. Let the user submit a note of what plant they found []
    // 7. Pass to administration to be verified []
    function CustomMarker() {

        let data

        const map = useMapEvents({ // this map function creates a new marker on the map and stores in the database

            click(e) {
                const pos = e.latlng // this is a single object of coordinates - use this to add the coordinates to the database
                var marker2 = new L.Marker(new L.latLng(pos)) // creates a new marker
                map.addLayer(marker2)// adds the marker to the map
                const marker2Coor = marker2.getLatLng().lat // get lat
                const marker3Coor = marker2.getLatLng().lng // get lng
                data = { // mongoose schema
                    location: {
                        coordinates: [marker2Coor, marker3Coor]
                    },
                }
                setMarkerData(data)
            }
        })

        // Commented out until I can sort how to click on each pop up
        // On the backend - Do not add duplicate locations? or if they are dupliacte do not show them on the map
        // could be complex in that they only show the locations within grids on the map - i.e. not every pin pointed location?

        // useEffect(() => {
        //     axios.get('http://localhost:3500/locations') // axios to get from db - base directory needs to chnage at deployment
        //         .then((response) => {
        //             response.data.forEach(item => {
        //                 const lat = item.location.coordinates[0]                        
        //                 const lng = item.location.coordinates[1]
        //                 L.marker([lat, lng]).addTo(map)
        //                 console.log(response)
        //             })
        //         })
        // }, [map]);

        return (
            <>
                <Marker position={position}>
                    <Popup>
                        <Link to="/MapForm">Click to upload the plant you have found</Link>
                    </Popup>
                </Marker>
            </>
        )
    }
    if (isAdmin || isUser || isProfessional || isManager) {

    return (
        <>
            <Instruction />
            <MapContainer className='h-screen border-double border-2 border-cugreen  rounded-lg shadow-2xl' center={[54.63526961765724, -6.697285447066898]} zoom={9}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CustomMarker />
            </MapContainer>
        </>
    )

    } else {

        return (
            <Link className="grid place-content-center text-center antialiased min-h-screen text-2xl font-bold hover:bg-cugreen transition ease-in duration-300 hover:text-white" to="/Login">Sorry, you must be logged in to view this page.</Link>
        )
    }
}

export default Map



// marker.push(e.latlng) // this is an array of objects .push adds an element to the end of array - I may not need this
// setMarker((prevValue) => [...prevValue, e.latlng]);
// console.log(marker)


// axios.get('http://localhost:3500/locations') // axios to get from db - base directory needs to chnage at deployment
//     .then((response) => {
//         response.data.forEach(item => {
//             const lat = item.location.coordinates[0]
//             const lng = item.location.coordinates[1]
//             L.marker([lat, lng]).addTo(map).bindPopup("p")
//             // console.log(response) 
//         })
//     })

// axios
//   .get("http://localhost:3500/locations")
//   .then((response) => setMarkerData(response.data))
//   .catch((error) => console.error(error));

// {[markerData.lat, markerData.lng]}

// axios.post('http://localhost:3500/locations', data) // axios to store in db - base directory needs to change at deployment
// .then((response) => {
//     console.log(response.data.location)
//     setMarkerData(response.data.location)
// })