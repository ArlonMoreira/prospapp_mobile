//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loading: false,
};

export const register = createAsyncThunk(
    'class/register',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().classRegister({
            data,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MDEzODkxLCJpYXQiOjE3MjQ1ODE4OTEsImp0aSI6ImZmZTUzNTgwOGE1NDQ2NGI5MmY2NGQ4OTU2NTU2NjkzIiwidXNlcl9pZCI6MX0.LqVSVxdPlKeK06eHqAOc3ac-z1WT0WbFJPnmgqMgtD0'
        });
        console.log(response)
        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const classSlice = createSlice({
    name: 'class',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;           
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
            })
    }
});

export default classSlice.reducer;