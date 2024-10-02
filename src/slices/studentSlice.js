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

export const list = createAsyncThunk(
    'student/list',
    async(classId, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().studentList({
            classId,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MDg2MzAxLCJpYXQiOjE3Mjc2NTQzMDEsImp0aSI6IjU2NTVjMzFjZDBlYjQ3YjM4NDQ2ODFlNGRkZDE4OTYwIiwidXNlcl9pZCI6MX0.QnIWbEf-VU5J51tc1qIOdIFGi3cokM2hh1rK0go2sqY'
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
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MDg2MzAxLCJpYXQiOjE3Mjc2NTQzMDEsImp0aSI6IjU2NTVjMzFjZDBlYjQ3YjM4NDQ2ODFlNGRkZDE4OTYwIiwidXNlcl9pZCI6MX0.QnIWbEf-VU5J51tc1qIOdIFGi3cokM2hh1rK0go2sqY'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const studentSlice = createSlice({
    name: 'student',
    initialState,
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
            //Sucesso lista
            .addCase(list.fulfilled, (state, action) => {
                state.data = action.payload.data;
            })

    }
});

export default studentSlice.reducer;