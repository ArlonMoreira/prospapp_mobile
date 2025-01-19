//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";
import { useReducer } from "react";

const initialState = {
    data: [],
    loadingRegister: false,
    loadingList: false,
    loadingChange: false,
    loadingRemove: false,
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
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NjI3NzA5LCJpYXQiOjE3MzcxOTU3MDksImp0aSI6ImEyOGVjYmEyZDUxMTQ2NGFiMTYzYTgxZDRjYzkwYmUyIiwidXNlcl9pZCI6MX0.90lQoS54UasIKjYzniEifVtzLndXDt1fYEZR0uZSFnQ'
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
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NjI3NzA5LCJpYXQiOjE3MzcxOTU3MDksImp0aSI6ImEyOGVjYmEyZDUxMTQ2NGFiMTYzYTgxZDRjYzkwYmUyIiwidXNlcl9pZCI6MX0.90lQoS54UasIKjYzniEifVtzLndXDt1fYEZR0uZSFnQ'
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
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NjI3NzA5LCJpYXQiOjE3MzcxOTU3MDksImp0aSI6ImEyOGVjYmEyZDUxMTQ2NGFiMTYzYTgxZDRjYzkwYmUyIiwidXNlcl9pZCI6MX0.90lQoS54UasIKjYzniEifVtzLndXDt1fYEZR0uZSFnQ'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }                
    }
);

export const change = createAsyncThunk(
    'student/change',
    async({student, data}, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().studentChange({
            student,
            data,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NjI3NzA5LCJpYXQiOjE3MzcxOTU3MDksImp0aSI6ImEyOGVjYmEyZDUxMTQ2NGFiMTYzYTgxZDRjYzkwYmUyIiwidXNlcl9pZCI6MX0.90lQoS54UasIKjYzniEifVtzLndXDt1fYEZR0uZSFnQ'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const remove = createAsyncThunk(
    'student/remove',
    async(student, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().studentRemove({
            student,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NjI3NzA5LCJpYXQiOjE3MzcxOTU3MDksImp0aSI6ImEyOGVjYmEyZDUxMTQ2NGFiMTYzYTgxZDRjYzkwYmUyIiwidXNlcl9pZCI6MX0.90lQoS54UasIKjYzniEifVtzLndXDt1fYEZR0uZSFnQ'
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
            //Aguardando remoção de aluno
            .addCase(remove.pending, (state) => {
                state.loadingRemove = true;
            })
            //Sucesso ao remover um aluno
            .addCase(remove.fulfilled, (state, action) => {
                state.loadingRemove = false;
                
                if (!action.payload.data.is_active){
                    const newData = state.data.filter(data => data.id !== action.payload.data.id);
                    state.data = newData;
                }

            })
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
            .addCase(list.pending, (state) => {
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

                const studentDataMap = new Map(
                    action.payload.data.map(student => [student.student, student])
                );

                state.data = state.data.map(data => {
                    const student = studentDataMap.get(data.id);
                    if(student){
                        return {
                            ...data,
                            date: student.date,
                            present: student.present
                        }
                    }

                    return data;

                });

                state.loadingCall = false;
                state.successCall = true;

            })
            //Aguardando alterar
            .addCase(change.pending, (state) => {
                state.loadingChange = true;
            })
            //Sucesso ao alterar
            .addCase(change.fulfilled, (state, action) => {

                state.data = state.data.map(data => {
                    if(data.id === action.payload.data.id){
                        data.name = action.payload.data.name;
                        data.identification_number = action.payload.data.identification_number;
                    }

                    return data;

                });

                state.loadingChange = false;
                
            })
            //Falha ao alterar
            .addCase(change.rejected, (state) => {
                state.loadingChange = false;
            })
            //

    }
});

export default studentSlice.reducer;