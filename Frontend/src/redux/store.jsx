import { configureStore } from "@reduxjs/toolkit";
import InstaLoadingReducer from './features/InstaSlice'

export const store = configureStore({
    reducer: {
        InstaLoader:InstaLoadingReducer
    },
})