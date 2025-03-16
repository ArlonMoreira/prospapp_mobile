//Redux
import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data:[],
    loading: false
};

export const listUsersManager = createAsyncThunk(
    'manager/list',
    async(companyId,  { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().listUsersManager({
            companyId,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyNDk1ODQ1LCJpYXQiOjE3NDIwNjM4NDUsImp0aSI6ImNiNWY4ZDUxN2RiODQ2ZTg4MjIzOWI0NjU5YjQ2ZmRjIiwidXNlcl9pZCI6MX0.GqDLqchKyaNo0oZ86CW-A78z5577ZOQ74L5uQ7c4JGE"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const managerSlice = createSlice({
    name: 'manager',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(listUsersManager.pending, (state) => {
                state.loading = true;
            })
            .addCase(listUsersManager.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(listUsersManager.rejected, (state) => {
                state.loading = false;
            })
    }
});

export default managerSlice.reducer;