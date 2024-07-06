//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useAuthentication from "../hooks/useAuthentication";

const initialState = {
    userAuth: null,
    success: false,
    loading: false
};


export const signin = createAsyncThunk(
    'auth/signin',
    async(data, {rejectWithValue}) => {
        const response = await useAuthentication().login(data);

        if(response.success){
            return response;
        } else {
            rejectWithValue(response);
        }

    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {

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
            })
            //Erro
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.userAuth = null;
                state.success = false;
            })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;