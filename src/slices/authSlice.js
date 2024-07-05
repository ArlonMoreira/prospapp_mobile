//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    userAuth: {},
    success: false,
    loading: false
};


export const signin = createAsyncThunk(
    'auth/signin',
    async(data, {rejectWithValue}) => {
        console.log(data);
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
            })
            //Erro
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
            })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;