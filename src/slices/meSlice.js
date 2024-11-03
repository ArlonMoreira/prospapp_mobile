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
        const response = await useRequest().me('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwOTkxOTg0LCJpYXQiOjE3MzA1NTk5ODQsImp0aSI6ImQ4NTM0OWRhMTYxODRmOTU4MDY0YWVmMGZiYzRjNjViIiwidXNlcl9pZCI6MX0.3DtQvq9dJKrl2LBp8KPQGXadcvniBm5nPSTAhYP_yso');

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