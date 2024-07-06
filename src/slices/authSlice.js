//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useAuthentication from "../hooks/useAuthentication";

const initialState = {
    userAuth: null,
    success: false,
    loading: false,
    errorMensage: null,
    errors: []
};


export const signin = createAsyncThunk(
    'auth/signin',
    async(data, {rejectWithValue}) => {
        const response = await useAuthentication().login(data);
        if(response.success){
            return response;
        } else {         
            return rejectWithValue(response);
        }

    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetErrorMensage: (state) => {
            state.errorMensage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //Carregamento
            .addCase(signin.pending, (state, action) => {
                state.loading = true;
            })
            //Sucesso
            .addCase(signin.fulfilled, (state, action) => {
                state.loading = false;
                state.userAuth = action.payload.data;
                state.success = true;
                state.errorMensage = null;
                state.errors = [];
            })
            //Erro
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.userAuth = null;
                state.success = false;
                state.errorMensage = action.payload.message;
                state.errors = action.payload.data;
            })
    }
});

export const { resetErrorMensage } = authSlice.actions;
export default authSlice.reducer;