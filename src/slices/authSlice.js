//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    userAuth: null,
    success: false,
    loading: false,
    errorMessage: null,
    errors: []
};


export const signin = createAsyncThunk(
    'auth/signin',
    async(data, {rejectWithValue}) => {
        const response = await useRequest().login(data);
        
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
        resetErrorMessage: (state) => {
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //Carregamento
            .addCase(signin.pending, (state) => {
                state.loading = true;
            })
            //Sucesso
            .addCase(signin.fulfilled, (state, action) => {
                state.loading = false;
                state.userAuth = action.payload.data;
                state.success = true;
                state.errorMessage = null;
                state.errors = [];
            })
            //Erro
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.userAuth = null;
                state.success = false;
                state.errorMessage = action.payload.message;
                state.errors = action.payload.data;
            })
    }
});

export const { resetErrorMessage } = authSlice.actions;
export default authSlice.reducer;