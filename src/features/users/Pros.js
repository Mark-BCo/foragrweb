import { useNavigate } from "react-router-dom";
import { useGetProsQuery } from "../../app/api/proApiSlice";
import { memo } from 'react'
import React from "react"

const Pros = ({ userId }) => {

    const { pros } = useGetProsQuery("prosList", {
        selectFromResult: ({ data }) => ({
            pros: data?.entities[userId]
        }),
    })

    const navigate = useNavigate()

    if (pros) {

        const handleEdit = () => navigate(`/users/pros/${userId}`)

        const cellStatus = pros.active ? '' : 'table__cell--inactive'

        return (
            <tr>
                <td className={`table__cell ${cellStatus}`}>{pros.ownername}</td>
                <td className={`table__cell ${cellStatus}`}>{pros.orgname}</td>
                <td className={`table__cell ${cellStatus}`}>{pros.website}</td>
                <td className={`table__cell ${cellStatus}`}>{pros.email}</td>
                <td className={`table__cell ${cellStatus}`}><button onClick={handleEdit}>Edit</button></td>
            </tr>
        )
    } else return null
}

const memoizedUser = memo(Pros)

export default memoizedUser

