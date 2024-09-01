//Redux
import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    userData: null,
    success: false,
    loading: false,

};

export const me = createAsyncThunk(
    'auth/me',
    async(_, { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().me('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1NTg1MjY4LCJpYXQiOjE3MjUxNTMyNjgsImp0aSI6ImE1ZTdjMjAwZTExYjRhMmFiYmFlZTc3ZjM5MjA4MzFjIiwidXNlcl9pZCI6MX0.Dq970N987M4t1ASfL_iuJ6Tvq-1SHpOlvlfIMflu8Po');

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const meSlice = createSlice({
    name: 'me',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(me.pending, (state)=>{
                state.loading = true;
            })
            .addCase(me.fulfilled, (state, action)=>{
                state.loading = false;
                state.userData = action.payload.data;
            })
    }
});

export default meSlice.reducer;