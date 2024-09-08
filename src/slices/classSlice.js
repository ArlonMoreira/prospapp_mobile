//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loading: false,
    success: false,
    error: false
};

export const register = createAsyncThunk(
    'class/register',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().classRegister({
            data,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2MTY5MDE5LCJpYXQiOjE3MjU3MzcwMTksImp0aSI6ImM4NGU5YzY2OGU0NzRjZWQ4MDE1YjA3Yzk0ZmNkZGM0IiwidXNlcl9pZCI6MX0.QBGUe8Z0jgAy0wNj0to83KvygTKmaFz1zYv93dCidBM'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const list = createAsyncThunk(
    'class/list',
    async(company, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().classList({
            company,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2MTY5MDE5LCJpYXQiOjE3MjU3MzcwMTksImp0aSI6ImM4NGU5YzY2OGU0NzRjZWQ4MDE1YjA3Yzk0ZmNkZGM0IiwidXNlcl9pZCI6MX0.QBGUe8Z0jgAy0wNj0to83KvygTKmaFz1zYv93dCidBM'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        

    }
)

export const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        resetErrorStatus:(state) =>{
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            //Aguardando cadastro
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = false;     
            })
            //Sucesso cadastro
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = false;
                state.data.push(action.payload.data);
            })
            //Falha do cadastro
            .addCase(register.rejected, (state) => {
                state.loading = false;
                state.success = false;
                state.error = true;
            })
            //Listar grupos
            .addCase(list.fulfilled, (state, action) => {
                state.data = action.payload.data;
            })
    }
});

export const { resetErrorStatus } = classSlice.actions;
export default classSlice.reducer;