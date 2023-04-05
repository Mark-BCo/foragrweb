import { createSlice } from "@reduxjs/toolkit";

let initialState = {plantSearch: ''}

const plantSlice = createSlice({
    name: 'plants',
    initialState,
    reducers: {
        searchPlant: (state, action) => {
            state.plantSearch = action.payload
        },
        
    },
})

export const { searchPlant } = plantSlice.actions

export default plantSlice.reducer
