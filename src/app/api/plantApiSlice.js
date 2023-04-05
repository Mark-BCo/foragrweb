import {apiSlice} from './apiSlice'
import axios from 'axios'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"


const plantsAdapter = createEntityAdapter({})

const initialState = plantsAdapter.getInitialState()


export const plantsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPlants: builder.query({
            query: () => '/plants',
        }),
        searchPlantByName: builder.query({
            query: (commonname) => `/plants/onePlant/${commonname}`, 
        }),
        updatePlant: builder.mutation({
            query: initialUserData => ({
                url: '/plants',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Plant', id: arg.id }
            ]
        }),
    })
})

export const getPlantsPage = async (pageParam = 1) => {
    const response = await axios.get(`/plants?page=${pageParam}`)
    return response.data
}

// Returns the query result object
export const selectPlantResult = plantsApi.endpoints.getPlants.select()

// creates memoized selector
const selectPlantData = createSelector (
    selectPlantResult,
    plantResult => plantResult.data // normalised state object with ids & entities
)

export const {useGetPlantsQuery, useSearchPlantByNameQuery, useUpdatePlantMutation } = plantsApi

// getSelectors creates these selectors and rename them with aliases using destructuring
export const {
    selectAll: selectAllPlants,
    selectById: selectPlantById,
    selectIds: selectPlantIds,
    //Pass in a selector that returns the users slice of the state
} = plantsAdapter.getSelectors(state => selectPlantData(state) ?? initialState)