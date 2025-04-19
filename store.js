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
import managerReducer from "./src/slices/managerSlice";
import codeReducer from "./src/slices/codeSlice";
import codeRefreshReducer from "./src/slices/codeRefresh";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        companys: companysReducer,
        me: meReducer,
        class: classReducer,
        student: studentReducer,
        report: reportReducer,
        resetPassword: resetPasswordReducer,
        manager: managerReducer,
        code: codeReducer,
        codeRefresh: codeRefreshReducer
    }
});