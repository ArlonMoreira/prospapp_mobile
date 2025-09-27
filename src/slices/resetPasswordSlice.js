//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    success: false,
    loading: false,
    errorMessage: null,
    errors: []
};

export const reset = createAsyncThunk(
    'resetPassword/reset',
    async(data, { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().resetpassword({
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

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {
        resetForm: (state) => {
            state.success = false;
            state.loading = false;
            state.errorMessage = null;
            state.errors = [];              
        },
        resetErrorMessage: (state) => {
            state.errorMessage = null;
            state.errors = [];
        }
    },
    extraReducers: (builder) => {
        builder
            //Carregamento reiniciar senha
            .addCase(reset.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            //Sucesso ao cadastrar senha
            .addCase(reset.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.errorMessage = null;
                state.errors = [];                
            })
            //Falha ao alterar a senha
            .addCase(reset.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
                state.errors = action.payload.data;
                state.success = false;
            })
    }
});

export const { resetErrorMessage, resetForm } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;