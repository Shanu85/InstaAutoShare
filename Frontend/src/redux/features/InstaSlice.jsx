import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading:false
}

export const InstaLoadingSlice=createSlice({
    name:'InstaLoader',
    initialState,
    reducers:
    {
        changeLoading:(state)=>{
            state.isLoading=!state.isLoading
        }
    }
})

export const {changeLoading}=InstaLoadingSlice.actions

export default InstaLoadingSlice.reducer