import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProsById } from '../../../app/api/proApiSlice'
import EditProsForm from './EditProsForm'
import React from "react"


const EditPros = () => {
    
    const { id } = useParams()

    const pros = useSelector(state => selectProsById(state, id))

    const content = pros ? <EditProsForm pros={pros} /> : <p>Loading...</p>

    return content
}
export default EditPros