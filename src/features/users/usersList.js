import { useGetUsersQuery } from "../../app/api/usersApiSlice"
import User from './User';
import Admin from "../auth/Admin";
import React from "react"

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery("usersList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>


    if (isError) {
        content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data.message}</p>
    }


    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)

        content = (
            <>
                <Admin />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 font-bold antialiased">
                    <div className="pb-4 dark:bg-gray-900">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold" placeholder="Search for users" />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                        <thead className="text-xs border uppercase bg-cugreen text-white">
                            <tr>
                                <th scope="col" className="border border-white-600 px-4 py-3">Username</th>
                                <th scope="col" className="border border-white-600 px-4 py-3">First Name</th>
                                <th scope="col" className="border border-white-600 px-4 py-3">Last Name</th>
                                <th scope="col" className="border border-white-6006 px-4 py-3">Email</th>
                                <th scope="col" className="border border-white-600 px-4 py-3">Roles</th>
                                <th scope="col" className="border border-white-600 px-4 py-3">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    return content
}

export default UsersList