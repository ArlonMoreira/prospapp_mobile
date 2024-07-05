import { configureStore } from "@reduxjs/toolkit";
//Reducers
import authReducer from './src/slices/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});