import { configureStore } from "@reduxjs/toolkit";
//Reducers
import authReducer from './src/slices/authSlice';
import registerReducer  from './src/slices/registerSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer
    }
});