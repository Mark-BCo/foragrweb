import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setCredentials} from '../api/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: "https://foragr-api.onrender.com", // base directory needs to change at deployment
    credentials: 'include', // always include the cookie for the refresh token
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log(args)
    // console.log(api)
    // console.log(extraOptions)

    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        // console.log("sending refresh token")

        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if(refreshResult?.data) {

            // store the new token
            api.dispatch(setCredentials({...refreshResult.data}))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error.status === 403) {
                refreshResult.error.data.message = "Your login has expired. "
            }
            return refreshResult
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Plants', 'Pros', 'Location', 'Profile'],
    endpoints: builder => ({
        
    })
})