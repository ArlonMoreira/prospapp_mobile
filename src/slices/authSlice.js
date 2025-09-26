//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    userAuth: null,
    success: false,
    loadingLogout: false,
    loading: false,
    errorMessage: null,
    recoverPassword: false,
    errors: [],
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

export const logout = createAsyncThunk(
    'auth/logout',
    async(_, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().logout({
            data: {
                refresh: userAuth.refresh
            },
            token: userAuth.token
        });

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
        },
        resetRecoverPassword: (state) => {
            state.recoverPassword = false;
            state.userAuth = {
                ...state.userAuth,
                recoverPassword: state.recoverPassword
            }
        },
        setUserAuth: (state, action) => {
            state.userAuth = action.payload;
            if(action.payload.recover_password) state.recoverPassword = action.payload.recover_password;
            state.loading = false;
            state.success = true;
            state.errorMessage = null;
            state.errors = [];            
        }
    },
    extraReducers: (builder) => {
        builder
            //carregamento logout
            .addCase(logout.pending, (state) => {
                state.loadingLogout = true;
            })
            //Sucesso logout
            .addCase(logout.fulfilled, (state) => {
                state.userAuth = null;
                state.loadingLogout = false;
            })
            //Carregamento login
            .addCase(signin.pending, (state) => {
                state.loading = true;
            })
            //Sucesso login
            .addCase(signin.fulfilled, (state, action) => {
                state.loading = false;
                state.userAuth = action.payload.data;
                state.success = true;
                state.errorMessage = null;
                state.errors = [];
            })
            //Erro logout
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.userAuth = null;
                state.success = false;
                state.errorMessage = action.payload.message;
                state.errors = action.payload.data;
            })
    }
});

export const { resetErrorMessage, setUserAuth, resetRecoverPassword } = authSlice.actions;
export default authSlice.reducer;