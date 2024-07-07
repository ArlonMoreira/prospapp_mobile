//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: null,
    loading: false,
    success: false,
    errorMessage: null,
    errors: []
};

export const register = createAsyncThunk(
    'register/register',
    async(data, {rejectWithValue}) => {
        const response = await useRequest().register(data);
 
        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }
    }
);

export const registerSlice = createSlice({
    name: 'register', //Nome do slice
    initialState, //Estado inicial
    reducers: { //Reducers, funções para manipulação do estado
        resetForm: (state) => {
            state.data = null;
            state.loading = false;
            state.success = false;
            state.errorMessage = null;
            state.errors = [];
        },        
        resetErrorMessage: (state) => {
            state.errorMessage = null;
        } 
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.errorMessage = null;
                state.errors = [];
                state.data = action.payload.data;
            })
            .addCase(register.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.errorMessage = action.payload.message;
                state.errors = action.payload.data;
                state.data = false;
            })
    }
});

export const { resetErrorMessage, resetForm } = registerSlice.actions;
export default registerSlice.reducer;


