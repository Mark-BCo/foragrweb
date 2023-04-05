import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"

const prosAdapter = createEntityAdapter({
    // can sort the users in here
})

const initialState = prosAdapter.getInitialState()

export const prosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPros: builder.query({
            query: () => ({
                url: '/pros',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            keepUnusedDataFor: 200,
            transformResponse: responseData => {
                const loadedPros = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return prosAdapter.setAll(initialState, loadedPros)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewPro: builder.mutation({
            query: initialUserData => ({
                url: '/pros',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updatePro: builder.mutation({
            query: initialUserData => ({
                url: '/pros',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deletePro: builder.mutation({
            query: ({ id }) => ({
                url: `/pros`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetProsQuery,
    useAddNewProMutation,
    useUpdateProMutation,
    useDeleteProMutation,
} = prosApiSlice

// Returns the query result object
export const selectProsResult = prosApiSlice.endpoints.getPros.select()

// creates memoized selector
const selectProsData = createSelector (
    selectProsResult,
    prosResult => prosResult.data // normalised state object with ids & entities
)

// getSelectors creates these selectors and rename them with aliases using destructuring
export const {
    selectAll: selectAllPros,
    selectById: selectProsById,
    selectIds: selectProsIds,
    //Pass in a selector that returns the users slice of the state
} = prosAdapter.getSelectors(state => selectProsData(state) ?? initialState)