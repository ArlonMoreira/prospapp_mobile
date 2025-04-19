//Redux
import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    loading: false
};

export const refresh = createAsyncThunk(
    'codeRefresh/register',
    async(email, { rejectWithValue }) => {
        const response = await useRequest().register_refresh_code({email});
 
        if (response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const codeRefreshSlice = createSlice({
    name: 'codeRefresh',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(refresh.pending, (state) => {
                state.loading = true;
            })
            .addCase(refresh.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(refresh.rejected, (state) => {
                state.loading = false;
            })    
    }
});

export default codeRefreshSlice.reducer;
