import { createSlice } from "@reduxjs/toolkit";

let initialState = {profileSearch: ''}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        searchProfile: (state, action) => {
            state.profileSearch = action.payload
        },
        
    },
})

export const { searchProfile } = profileSlice.actions

export default profileSlice.reducer
