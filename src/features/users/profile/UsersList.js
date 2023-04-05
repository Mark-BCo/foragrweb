import { useGetUsersQuery } from "../../../app/api/usersApiSlice"
import Users from './Users';
import React from "react"


const UsersProfileList = () => {

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

        const tableContent = ids?.length && ids.map(userId => <Users key={userId} userId={userId} />)

        content = (
            <>
          
                <div className="">{tableContent}</div>
            </>
        )
    }
    return content
}

export default UsersProfileList

// import React from "react"


// const UserProfile = ({ userId }) => {

//     return (
//         <div className="rounded shadow-2xl text-black bg-shamrock bg-opacity-30">
//             <div className="" key={userId}>
//                 <div>Edit</div>
//                 <div className="">
//                     <div className="px-4 pb-2">
//                         <div className="flex bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">Username:</div>
//                     </div>
//                     <div className="px-4 pb-2">
//                         <div className="flex bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">Firstname</div>
//                     </div>
//                     <div className="px-4 pb-2">
//                         <div className=" bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">Lastname</div>
//                     </div>
//                     <div className="px-4 pb-2">
//                         <div className=" bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">Website:</div>
//                     </div>
//                     <div className="px-4 pb-2">
//                         <div className=" bg-azure rounded px-3 py-1 font-black drop-shadow-lg border-solid border-2">Organisation:</div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }



// export default UserProfile