import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const EditUserProfile = () => {

    const { username } = useAuth()

    const [userName, setUserName] = useState(username)
    const [bio, setBio] = useState('')
    const [craft, setCraft] = useState(false)
    const [forage, setForage] = useState(false)
    const [eat, setEat] = useState(false)
    const [lore, setLore] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate()

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUserNameInput = (e) => setUserName(e.target.value)
    const handleBioInput = (e) => setBio(e.target.value)

    const handleUserForm = (e) => {

        e.preventDefault()

        const formData = new FormData()
        formData.append('username', userName)
        formData.append('bio', bio)
        formData.append('craft', craft)
        formData.append('forage', forage)
        formData.append('eat', eat)
        formData.append('lore', lore)
        formData.append('image', selectedImage)

        axios
            .patch("https://foragr-api.onrender.com/profile", formData, {
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

        navigate('/dash')

    }

    return (
        <div className="grid place-content-center min-h-screen">
            <form className="flex flex-col border rounded p-4 font-bold antialiased" onSubmit={handleUserForm}>

                <input type='hidden' name="hiddenField" value={userName} onChange={handleUserNameInput}></input>

                <label htmlFor="bio">Please add your bio</label>

                <input className="border rounded"
                    type="text"
                    id="bio"
                    value={bio}
                    autoComplete="off"
                    onChange={handleBioInput}
                    required
                    placeholder="User Bio" />

                <div>Please upload your Profile Picture</div>

                <input className="border rounded"
                    type="file"
                    onChange={handleImageChange}
                />
                <ul className="flex flex-col p-2">

                    <li className="p-1" >
                        <div className="flex justify-between">
                            <label htmlFor="checkbox" >Do you enjoy making crafts?</label>
                            <input id="checkbox1" type="checkbox" onChange={(e) => setCraft(prevCheck => !prevCheck)} />
                        </div>
                    </li>
                    <li className="p-1" >
                        <div className="flex justify-between">
                            <label htmlFor="checkbox" >Do you enjoy foraging?</label>
                            <input id="checkbox2" type="checkbox" onChange={(e) => setForage(true)} />
                        </div>
                    </li>
                    <li className="p-1" >
                        <div className="flex justify-between">
                            <label htmlFor="checkbox" >Would you like to find recipies from foraging wild food?</label>
                            <input id="checkbox3" type="checkbox" onChange={(e) => setEat(true)} />
                        </div>
                    </li>
                    <li className="p-1" >
                        <div className="flex justify-between">
                            <label htmlFor="checkbox" >Would you like to know more about folklore in your local area?</label>
                            <input id="checkbox4" type="checkbox" onChange={(e) => setLore(true)} />
                        </div>
                    </li>
                    <button className="flex justify-center border rounded-md mt-2 p-2 hover:bg-cugreen hover:text-white">Click to submit</button>
                </ul>
            </form>
        </div>
    )
}

export default EditUserProfile