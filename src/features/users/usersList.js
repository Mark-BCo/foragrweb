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
                    <table className="border-collapse mt-8">
                        <thead className="border uppercase bg-cugreen text-white">
                            <tr>
                                <th scope="col" className="border border-white-600">Username</th>
                                <th scope="col" className="border border-white-600">First Name</th>
                                <th scope="col" className="border border-white-600">Last Name</th>
                                <th scope="col" className="border border-white-6006">Email</th>
                                <th scope="col" className="border border-white-600">Roles</th>
                                <th scope="col" className="border border-white-600">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
            </>
        )
    }
    return content
}

export default UsersList