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
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwOTkxOTg0LCJpYXQiOjE3MzA1NTk5ODQsImp0aSI6ImQ4NTM0OWRhMTYxODRmOTU4MDY0YWVmMGZiYzRjNjViIiwidXNlcl9pZCI6MX0.3DtQvq9dJKrl2LBp8KPQGXadcvniBm5nPSTAhYP_yso'
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
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwOTkxOTg0LCJpYXQiOjE3MzA1NTk5ODQsImp0aSI6ImQ4NTM0OWRhMTYxODRmOTU4MDY0YWVmMGZiYzRjNjViIiwidXNlcl9pZCI6MX0.3DtQvq9dJKrl2LBp8KPQGXadcvniBm5nPSTAhYP_yso'
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
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwOTkxOTg0LCJpYXQiOjE3MzA1NTk5ODQsImp0aSI6ImQ4NTM0OWRhMTYxODRmOTU4MDY0YWVmMGZiYzRjNjViIiwidXNlcl9pZCI6MX0.3DtQvq9dJKrl2LBp8KPQGXadcvniBm5nPSTAhYP_yso'
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
                const student = state.data.find((student) => student.id === action.payload.data.student);
                if(student){
                    student.present = action.payload.data.present;
                }
                state.successCall = true;

            })

    }
});

export default studentSlice.reducer;