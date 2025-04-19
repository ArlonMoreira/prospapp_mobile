//Redux
import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    loading: false,
    errorMessage: null,
    error: false,
    data: {}
};

export const register = createAsyncThunk(
    'code/register',
    async(data, { rejectWithValue }) => {
        const response = await useRequest().register_check(data);

        if (response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: { //Reducers, funções para manipulação do estado
        resetState: (state) => {
            state.loading = false;
            state.errorMessage = null;
            state.error = false;
            state.data = {};
        },
        resetErrorMessage: (state) => {
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.data = action.payload.data;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload.message;
            })
    }
});

export const { resetState, resetErrorMessage } = codeSlice.actions;
export default codeSlice.reducer;

