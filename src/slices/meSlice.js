//Redux
import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    userData: null,
    success: false,
    loading: false,
    errorMessage: null,
    errors: []
};

export const me = createAsyncThunk(
    'auth/me',
    async(_, { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().me("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5NDA2MDQyLCJpYXQiOjE3NTg5NzQwNDIsImp0aSI6IjMwODRmMmVjZGZhMjRkZDk5ZmJhNzVlZjc0YTBhNWRhIiwidXNlcl9pZCI6MX0.MH8lmEHCFVSwSDDvh7MC1yh4ELjZ-HIJ3_UKfwumRnY");

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const change = createAsyncThunk(
    'auth/change',
    async(data, { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().change({
            data,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5NDA2MDQyLCJpYXQiOjE3NTg5NzQwNDIsImp0aSI6IjMwODRmMmVjZGZhMjRkZDk5ZmJhNzVlZjc0YTBhNWRhIiwidXNlcl9pZCI6MX0.MH8lmEHCFVSwSDDvh7MC1yh4ELjZ-HIJ3_UKfwumRnY"
        });

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
    reducers: {
        resetErrorMessage: (state) => {
            state.errorMessage = null;
        },
    },    
    extraReducers: (builder) => {
        builder
            .addCase(me.pending, (state) => {
                state.loading = true;
            })
            .addCase(me.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.data;
            })
            .addCase(change.pending, (state) => {
                state.loading = true;
            })
            .addCase(change.fulfilled, (state, action) => {
                state.loading = false;
                
                const newData = action.payload.data;
                state.userData.doc_number = newData.doc_number;
                state.userData.full_name = newData.full_name;
                state.errorMessage = null;
                state.errors = [];

            })
            .addCase(change.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
                state.errors = action.payload.data;

            })
    }
});

export const { resetErrorMessage } = meSlice.actions;
export default meSlice.reducer;