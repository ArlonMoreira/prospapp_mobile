import { configureStore } from "@reduxjs/toolkit";
//Reducers
import authReducer from './src/slices/authSlice';
import registerReducer  from './src/slices/registerSlice';
import companysReducer from "./src/slices/companysSlice";
import meReducer from './src/slices/meSlice';
import classReducer from './src/slices/classSlice';
import studentReducer from './src/slices/studentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        companys: companysReducer,
        me: meReducer,
        class: classReducer,
        student: studentReducer
    }
});