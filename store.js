import { configureStore } from "@reduxjs/toolkit";
//Reducers
import authReducer from './src/slices/authSlice';
import registerReducer  from './src/slices/registerSlice';
import companysReducer from "./src/slices/companysSlice";
import meReducer from './src/slices/meSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        companys: companysReducer,
        me: meReducer
    }
});