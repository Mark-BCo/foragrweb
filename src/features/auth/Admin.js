import React from "react"
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useLocation } from 'react-router-dom'
import DashBoard from "../users/profile/DashBoard"
import PlantTable from "../tools/plants/PlantTable"
import { useGetPlantsQuery } from "../../app/api/plantApiSlice"

const Admin = () => {

    const { username, isManager, isAdmin, isProfessional, isUser } = useAuth()
    const location = useLocation()
    const path = location.pathname

    // calling getAllPlants api query
    const { data: plant,
        isLoading,
        isError,
        error } = useGetPlantsQuery()

    let plantContent
    // Conditions of the api call
    if (plant?.length > 0) {
        plantContent = (plant?.map((plants) => {
            return <PlantTable plants={plants} key={plants?._id} />
        })
        )
    }

    if (isLoading) {
        plantContent = <tbody><tr><td>Loading</td></tr></tbody>
    }

    if (isError) {
        plantContent = <tbody><tr>{error.data.message}</tr></tbody>
    }

    let content

    if (path === '/dash') {

        content = (
            <>
                {(isManager || isAdmin) &&
                    <>
                        <div className="grid place-content-center">
                            <h1 className="flex w-48 md:w-32 lg:w-48 text-bold text-black">Welcome to Foragr {username}!</h1>
                        </div>
                        <div className="grid grid-cols-3 mt-16 text-white font-black antialiased">
                            {(isManager || isAdmin) && <div className="border rounded bg-cugreen text-center"><Link to="/dash/users">Edit Users</Link></div>}
                            {(isManager || isAdmin) && <div className="border rounded bg-cugreen text-center"><Link to="/dash/pros">Edit Professional Users</Link></div>}
                            {(isManager || isAdmin) && <div className="border rounded bg-cugreen text-center"><Link to="/dash/users/new">Add a New User</Link></div>}
                        </div>
                    </>
                }

                {(isProfessional) &&
                    <>
                        <div className="flex justify-center items-center h-44">
                            <h1 className="text-bold text-black">Welcome to Foragr, {username}!</h1>
                        </div>

                        <div>
                            <Link className="flex flex-col justify-center items-center h-8 bg-cugreen text-white" to="/dash/userprofile">Edit Your Profile</Link>
                        </div>

                        <DashBoard />

                        <div className="flex justify-center mt-6">
                            <table className="table-auto border-collapse border rounded shadow-2xl bg-shamrock bg-opacity-30">
                                <thead className="  bg-cugreen text-white antialised">
                                    <tr className="">
                                        <th className="border p-2">Common Name</th>
                                        <th className="border p-2">Species</th>
                                        <th className="border p-2">Habitat</th>
                                        <th className="border p-2">Scientific Name</th>
                                        <th className="border p-2">Edit</th>
                                    </tr>
                                </thead>
                                {plantContent}
                            </table>
                        </div>
                    </>}
                {(isUser) &&
                    <>
                        <div className="grid place-content-center">
                            <h1 className="flex w-48 md:w-32 lg:w-48 text-bold text-black">Welcome to Foragr {username}!</h1>
                            <Link to="/dash/userprofile">Edit Your Profile</Link>
                            <DashBoard />
                        </div>
                    </>}
            </>
        )
    } else {
        content = (
            <>
                <div className="grid place-content-center">
                    <h1 className="flex w-48 md:w-32 lg:w-48 text-bold text-black">Welcome to Foragr {username}!
                    </h1>
                </div>
                <div className="grid grid-cols-3 mt-16 text-white font-black antialiased">
                    {(isManager || isAdmin) && <div className="border rounded bg-cugreen text-center"><Link to="/dash/users">Edit Users</Link></div>}
                    {(isManager || isAdmin) && <div className="border rounded bg-cugreen text-center"><Link to="/dash/pros">Edit Professional Users</Link></div>}
                    {(isManager || isAdmin) && <div className="border rounded bg-cugreen text-center"><Link to="/dash/users/new">Add a New User</Link></div>}
                </div>
            </>
        )
    }
    return content
}

export default Admin