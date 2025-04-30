//Redux
import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    loading: false,
    success: false,
    errorMessage: null,
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
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.success = false;
            state.errorMessage = null;           
        },
        resetErrorMessage: (state) => {
            state.errorMessage = null;           
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(refresh.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.errorMessage = null;
            })
            .addCase(refresh.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.errorMessage = null;
            })
            .addCase(refresh.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.errorMessage = action.payload.message;
            })    
    }
});

export const { resetState, resetErrorMessage } = codeRefreshSlice.actions;
export default codeRefreshSlice.reducer;
