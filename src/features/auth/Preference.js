import React from 'react'
import { useState} from 'react'
import axios from '../../app/api/user'

const Preference = ({id}) => {

    const [bio, setBio] = useState('')
    const [craft, setCraft] = useState(false)
    const [forage, setForage] = useState(false)
    const [eat, setEat] = useState(false)
    const [lore, setLore] = useState(false)

    const [success, setSuccess] = useState(false)

    const handlePrefernce = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.patch(`http://localhost:3500/profile/${id}`,
                JSON.stringify({ bio, craft, forage, eat, lore }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },
                setSuccess(true)
            );
            console.log(response?.data);
            console.log(JSON.stringify(response))
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setBio('')
            setCraft(false)
            setForage(false)
            setEat(false)
            setLore(false)
            
            
        } catch (err) {
            if (!err?.response) {

            } else if (err.response?.status === 409) {

            } else {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response)

            }
        }
    }

    return (
        <>
            {success ?
                (<div className="grid place-content-center min-h-screen">
                    <h1>Thanks for submitting your preferences, please login!
                        <br />
                        <a href="/Login">Go to login</a>
                    </h1>
                </div>
                ) : (
                    <div className="grid place-content-center min-h-screen items-center antialiased font-black">
                        <h3 className="mb-4">Preferences</h3>
                        <form className="border rounded-md p-2 shadow-lg" onSubmit={handlePrefernce}>
                            <ul className="flex flex-col p-2">
                                <li className="p-1" >
                                    <div className="flex justify-between">
                                        <label htmlFor="text" >Please enter a little bit about yourself</label>
                                        <input id="text" type="text" onChange={(e) => setBio(e.target.value)}
                                        />
                                    </div>
                                </li>
                                <li className="p-1" >
                                    <div className="flex justify-between">
                                        <label htmlFor="checkbox" >Do you enjoy making crafts?</label>
                                        <input id="checkbox" type="checkbox" onChange={(e) => setCraft(true)} />
                                    </div>
                                </li>
                                <li className="p-1" >
                                    <div className="flex justify-between">
                                        <label htmlFor="checkbox" >Do you enjoy foraging?</label>
                                        <input id="checkbox" type="checkbox" onChange={(e) => setForage(true)} />
                                    </div>
                                </li>
                                <li className="p-1" >
                                    <div className="flex justify-between">
                                        <label htmlFor="checkbox" >Would you like to find recipies from foraging wild food?</label>
                                        <input id="checkbox" type="checkbox" onChange={(e) => setEat(true)} />
                                    </div>
                                </li>
                                <li className="p-1" >
                                    <div className="flex justify-between">
                                        <label htmlFor="checkbox" >Would you like to know more about folklore in your local area?</label>
                                        <input id="checkbox" type="checkbox" onChange={(e) => setLore(true)} />
                                    </div>
                                </li>
                            </ul>
                            <button className="flex justify-center border rounded-md mt-2 p-2 hover:bg-cugreen hover:text-white" type="Submit">
                                Submit
                            </button>
                        </form>
                    </div>
                )}
        </>

    )
}

export default Preference
