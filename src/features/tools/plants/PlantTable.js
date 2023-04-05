import React from "react"

const PlantTable = ({ plants }) => {

        return (
            <>
                <tbody>
                    <tr>
                        <td>{plants.commonname}</td>
                        <td>{plants.species}</td>
                        <td>{plants.habitat}</td>
                        <td>{plants.scientificname}</td>
                    </tr>
                </tbody>
            </>
        )
    
}

export default PlantTable
