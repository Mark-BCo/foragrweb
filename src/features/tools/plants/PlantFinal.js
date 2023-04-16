import { useSelector } from 'react-redux'
import { useSearchPlantByNameQuery, useGetPlantsQuery, getPlantsPage } from '../../../app/api/plantApiSlice'
import PlantCard from './PlantCard'
import SearchBar from './SearchBar'
import { useState } from 'react'
import PageButton from '../plants/PageButton'
import React from "react"

// Write a function to get the user input and match to the plant common name and the location of the plant [x]
// If a plant does not exist display a message []
// Update this function to find the plant by location and plantname []
// Find a way to stop the GET request from happening every time the page is opened []
const PlantFinal = () => {



    const [page, setPage] = useState(1)

    const { plantSearch } = useSelector((state) => state?.plants)

    /* This constant always calls the query for plant by name - resulting in the URL /$commoname being undefined
       and returning a 404 error - this cannot be called in a function or conditionally - need a way to prevent this from
       running every time - such as a redux mutation which raised some complex issues on returning the value required - 
       Found this to be a stumbling block throughout the application*/
    const { data: searchPlantResults, isLoading: isSearchLoading } = useSearchPlantByNameQuery(plantSearch)

    // calling getAllPlants api query
    const { data: plant,
        isSuccess,
        isLoading,
        isFetching,
        isPreviousData,
        isError,
        error } = useGetPlantsQuery(['/plants', page], () => getPlantsPage(page),
            { keepPreviousData: true }
        )

    if (isLoading) return <p>Loading Plants...</p>

    if (isSearchLoading) return <p>Loading Plants...</p>

    if (isError) return <p>Error: {error.message}</p>

    const lastPage = () => setPage(plant.total_pages)

    const firstPage = () => setPage(1)

    // the page content
    let content


    if (isSuccess) {
        // Conditions of the api call
        if (plant?.length > 0) {
            content = plantSearch === '' ? (plant?.map((plants) => {
                return <PlantCard className='' plants={plants} key={plants?._id} />
            })
            ) : (
                searchPlantResults?.length > 0 && searchPlantResults?.map((plants) => {
                    return <PlantCard className='' plants={plants} key={plants?._id} />
                })
            )
        }
        if (isLoading) {
            return <div>Loading</div>;
        }
    }

    const pagesArray = Array(plant.total_pages).fill().map((_, index) => index + 1)

    const nav = (
        <nav className="nav-ex2">
            <button onClick={firstPage} disabled={isPreviousData || page === 1}>&lt;&lt;</button>
            {/* Removed isPreviousData from PageButton to keep button focus color instead */}
            {pagesArray.map(pg => <PageButton key={pg} pg={pg} setPage={setPage} />)}
            <button onClick={lastPage} disabled={isPreviousData || page === plant.total_pages}>&gt;&gt;</button>
        </nav>
    )

    return (
        <>
            <SearchBar />

                <div className="flex flex-wrap justify-center">
                    {content}
                </div>
            
            {isFetching && <span className="loading">Loading...</span>}
        </>
    )
}

export default PlantFinal