import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"

const quotesAdapter = createEntityAdapter({})

const initialState = quotesAdapter.getInitialState()

export const quotesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getQuotes: builder.query({
            query: () => ({
                url: '/quote',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            keepUnusedDataFor: 200,
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return quotesAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Quote', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Quote', id }))
                    ]
                } else return [{ type: 'Quote', id: 'LIST' }]
            }
        }),
}),
})

export const {
    useGetQuotesQuery,
} = quotesApiSlice

// Returns the query result object
export const selectQuoteResult = quotesApiSlice.endpoints.getQuotes.select()

// creates memoized selector
const selectQuoteData = createSelector (
    selectQuoteResult,
    quotesResult => quotesResult.data // normalised state object with ids & entities
)

// getSelectors creates these selectors and rename them with aliases using destructuring
export const {
    selectAll: selectAllQuotes,
    //Pass in a selector that returns the users slice of the state
} = quotesAdapter.getSelectors(state => selectQuoteData(state) ?? initialState)