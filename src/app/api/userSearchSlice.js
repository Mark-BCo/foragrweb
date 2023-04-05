import { apiSlice } from "./apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        searchUserByName: builder.query({
            query: (username) => `/users/${username}`, 
        }),
    })
})

export const { useSearchUserByNameQuery} = usersApiSlice



