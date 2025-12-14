//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";
//Cache
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    userAuth: null,
    success: false,
    loadingLogout: false,
    loading: false,
    errorMessage: null,
    recoverPassword: false,
    errors: [],
    hydrated: false
};

export const loadStoredUserAuth = createAsyncThunk(
    'auth/loadStoredUserAuth',
    async () => {
        const stored = await AsyncStorage.getItem('userAuth');
        return stored ? JSON.parse(stored) : null;
    }
);

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

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async(_, {getState, rejectWithValue }) => {
        const userAuth = getState().auth.userAuth;
        const newUserAuth = await useRequest().refreshToken(userAuth);

        if(newUserAuth.success){
            return newUserAuth;
        } else {
            return rejectWithValue(newUserAuth);
        }

    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async(_, {dispatch, getState, rejectWithValue}) => {
        await dispatch(refreshToken());
        
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
            //Carregar token em ache
            .addCase(loadStoredUserAuth.pending, (state) => {
            state.hydrated = false;
            })
            .addCase(loadStoredUserAuth.fulfilled, (state, action) => {
            state.userAuth = action.payload;
            state.hydrated = true;
            })
            .addCase(loadStoredUserAuth.rejected, (state) => {
            state.userAuth = null;
            state.hydrated = true;
            })
            //carregamento logout
            .addCase(logout.pending, (state) => {
                state.loadingLogout = true;
            })
            //Sucesso logout
            .addCase(logout.fulfilled, (state) => {
                state.userAuth = null;
                state.loadingLogout = false;

                //Remover token em cache
                AsyncStorage.removeItem('userAuth');

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

                //Salvar token em cache
                AsyncStorage.setItem('userAuth', JSON.stringify(state.userAuth));

            })
            //Erro logout
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.userAuth = null;
                state.success = false;
                state.errorMessage = action.payload.message;
                state.errors = action.payload.data;

                //Remover token em cache
                AsyncStorage.removeItem('userAuth');

            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.userAuth = action.payload.data;

                //Salvar token em cache
                AsyncStorage.setItem('userAuth', JSON.stringify(state.userAuth));

            })   
            .addCase(refreshToken.rejected, (state, action) => {
                state.loading = false;
                state.userAuth = null;
                state.success = false;
                state.errorMessage = action.payload.message;
                state.errors = action.payload.data;

                //Remover token em cache
                AsyncStorage.removeItem('userAuth');            
            })
    }
});

export const { resetErrorMessage, setUserAuth, resetRecoverPassword } = authSlice.actions;
export default authSlice.reducer;