import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const MapForm = () => {

    const { username } = useAuth()

    console.log(username)

    const [userName, setUserName] = useState(username)
    const [name, setName] = useState('')
    const [location, setLocation] = useState([54.63526961765724, -6.697285447066898])
    const [commonname, setCommonName] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate()

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleNameInput = (e) => setName(e.target.value)
    const handleCommonNameInput = (e) => setCommonName(e.target.value)
    const handleLocationInput = (e) => setLocation(e.target.value)
    const handleUserNameInput = (e) => setUserName(e.target.value)



    const handleUserForm = (e) => {

        e.preventDefault()

        const formData = new FormData()
        formData.append('username', userName)
        formData.append('name', name)
        formData.append('location', location)
        formData.append('commonname', commonname)
        formData.append('image', selectedImage)

        axios
            .post("https://foragr-api.onrender.com/locations", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

            navigate('/Map')

    }

    return (
        <div className="grid place-content-center min-h-screen">
            <form className="flex flex-col border rounded p-4" onSubmit={handleUserForm}>

                <label htmlFor="name">Where are you?</label>

                <input type='hidden' name="hiddenField" onChange={handleLocationInput}></input>
                <input type='hidden' name="hiddenField" value={userName} onChange={handleUserNameInput}></input>

                <input className="border rounded"
                    type="text"
                    id="name"
                    value={name}
                    autoComplete="off"
                    onChange={handleNameInput}
                    required
                    placeholder="Plant Name" />

                <label htmlFor="commonname">Add the name of the plant you have found?</label>

                <input className="border rounded"
                    type="text"
                    id="commonname"
                    value={commonname}
                    autoComplete="off"
                    onChange={handleCommonNameInput}
                    required
                    placeholder="Plant Name" />

                <div>Please upload your image?</div>

                <input className="border rounded"
                    type="file"
                    onChange={handleImageChange}
                />
                <button className="flex justify-center border rounded-md mt-2 p-2 hover:bg-cugreen hover:text-white">Click to submit</button>
            </form>
        </div>
    )
}

export default MapForm