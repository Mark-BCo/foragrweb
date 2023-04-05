import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../app/api/authSlice'
import plantSlice from '../app/api/plantSlice'
import userSlice from "./api/userSlice"
import profileSlice from "./api/profileSlice"

// use confirgure store to create a store
// inside of the reducer referring to the api slice
// adding the middleware
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        plants: plantSlice,
        users: userSlice,
        profile: profileSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
    // devTools: false // change to false on deployment

})

setupListeners(store.dispatch)
