import { configureStore } from "@reduxjs/toolkit";
//Reducers
import authReducer from './src/slices/authSlice';
import registerReducer  from './src/slices/registerSlice';
import companysReducer from "./src/slices/companysSlice";
import meReducer from './src/slices/meSlice';
import classReducer from './src/slices/classSlice';
import studentReducer from './src/slices/studentSlice';
import reportReducer from './src/slices/reportSlice';
import resetPasswordReducer from './src/slices/resetPasswordSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        companys: companysReducer,
        me: meReducer,
        class: classReducer,
        student: studentReducer,
        report: reportReducer,
        resetPassword: resetPasswordReducer
    }
});