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
                        <div className="grid place-content-center">
                            <h1 className="flex text-bold text-black">Welcome to Foragr {username}!</h1>
                            <Link to='/profile' className="flex flex-col justify-center items-center h-8 bg-cugreen text-white">Create your profile</Link>
                            <Link to="/dash/userprofile" className="flex flex-col justify-center items-center h-8 bg-cugreen text-white">View Your Profile</Link>
                            <DashBoard />
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 font-bold antialiased">
                            <div className="pb-4 dark:bg-gray-900">
                                <label htmlFor="table-search" className="sr-only">Search</label>
                                <div className="relative mt-1">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold" placeholder="Search for a plant" />
                                </div>
                            </div>
                            <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                                <thead className="text-xs border uppercase bg-cugreen text-white">
                                    <tr>
                                        <th scope="col" className="border border-white-600 px-4 py-3">Common Name</th>
                                        <th scope="col" className="border border-white-600 px-4 py-3">Species</th>
                                        <th scope="col" className="border border-white-600 px-4 py-3">Habitat</th>
                                        <th scope="col" className="border border-white-600 px-4 py-3">Scientific Name</th>
                                        <th scope="col" className="border border-white-600 px-4 py-3">Edit</th>
                                    </tr>
                                </thead>
                                {plantContent}
                            </table>
                        </div>
                    </>}
                {(isUser) &&
                    <>
                        <div className="grid place-content-center">
                            <h1 className="flex text-bold text-black">Welcome to Foragr {username}!</h1>
                            <Link to='/profile' className="flex flex-col justify-center items-center h-8 bg-cugreen text-white">Create your profile</Link>
                            <Link to="/dash/userprofile" className="flex flex-col justify-center items-center h-8 bg-cugreen text-white">View Your Profile</Link>
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