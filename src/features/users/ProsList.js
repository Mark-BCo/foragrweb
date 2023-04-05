import { useGetProsQuery } from "../../app/api/proApiSlice";
import Admin from "../auth/Admin";
import Pros from './Pros';
import React from "react"

const ProsList = () => {

    const {
        data: pros,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>


    if (isError) {
        content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data.message}</p>

    }
    if (isSuccess) {

        const { ids } = pros

        const tableContent = ids?.length && ids.map(userId => <Pros key={userId} userId={userId} />)

        content = (
            <>
                <Admin />
                <table className="border-collapse mt-8">
                    <thead className="border uppercase bg-cugreen text-white">
                        <tr>
                            <th scope="col" className="border border-white-600">Owner Name</th>
                            <th scope="col" className="border border-white-600">Organisation Name</th>
                            <th scope="col" className="border border-white-600">Website</th>
                            <th scope="col" className="border border-white-600">Email</th>
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

export default ProsList