import { createSlice } from "@reduxjs/toolkit";

let initialState = {searchUser: ''}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        searchUser: (state, action) => {
            state.searchUser = action.payload
            console.log(state.getUser)
        },
        
    },
})

export const { searchUser } = userSlice.actions

export default userSlice.reducer
