//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loadingRegister: false,
    loadingList: false,
    success: false,
    error: false,
    loadingCall: false,
    successCall: false
};

export const list = createAsyncThunk(
    'student/list',
    async(classId, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().studentList({
            classId,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1ODU5ODEzLCJpYXQiOjE3MzU0Mjc4MTMsImp0aSI6IjNjNDM0M2UzNzc4MDRjY2FhMDQyYTA4N2Q3OGFjN2JhIiwidXNlcl9pZCI6MX0.g89MzvRncSGjptePQLU-dn47YavkFeg0VejxST-qsAQ'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }    
    }
);

export const register = createAsyncThunk(
    'student/register',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().studentRegister({
            data,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1ODU5ODEzLCJpYXQiOjE3MzU0Mjc4MTMsImp0aSI6IjNjNDM0M2UzNzc4MDRjY2FhMDQyYTA4N2Q3OGFjN2JhIiwidXNlcl9pZCI6MX0.g89MzvRncSGjptePQLU-dn47YavkFeg0VejxST-qsAQ'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const call = createAsyncThunk(
    'student/call',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().callRegister({
            data,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1ODU5ODEzLCJpYXQiOjE3MzU0Mjc4MTMsImp0aSI6IjNjNDM0M2UzNzc4MDRjY2FhMDQyYTA4N2Q3OGFjN2JhIiwidXNlcl9pZCI6MX0.g89MzvRncSGjptePQLU-dn47YavkFeg0VejxST-qsAQ'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }                
    }
)

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    extraReducers: (builder) => {
        builder
            //Aguardando cadastro
            .addCase(register.pending, (state) => {
                state.loadingRegister = true;
                state.success = false;
                state.error = false;     
            })
            //Sucesso cadastro
            .addCase(register.fulfilled, (state, action) => {
                state.loadingRegister = false;
                state.success = true;
                state.error = false;
                state.data.push(action.payload.data);
            })
            //Falha do cadastro
            .addCase(register.rejected, (state) => {
                state.loadingRegister = false;
                state.success = false;
                state.error = true;
            })
            //Aguardando lista
            .addCase(list.pending, (state, action) => {
                state.loadingList = true;
            })
            //Sucesso lista
            .addCase(list.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loadingList = false;
            })
            //Falha de listagem
            .addCase(list.rejected, (state) => {
                state.loadingList = false;
            })
            //Aguardando finalizar chamada
            .addCase(call.pending, (state) => {
                state.loadingCall = true;
                state.successCall = false;
            })
            //Sucesso chamada
            .addCase(call.fulfilled, (state, action) => {
                state.loadingCall = false;
                state.successCall = true;

            })

    }
});

export default studentSlice.reducer;