//Redux
import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import { refreshToken } from "./authSlice";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data:[],
    loading: false
};

export const listUsersManager = createAsyncThunk(
    'manager/list',
    async(companyId, {dispatch, getState, rejectWithValue}) => {
        await dispatch(refreshToken());

        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().listUsersManager({
            companyId,
            token: userAuth.token
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const updateUsersManager = createAsyncThunk(
    'manager/update',
    async({ companyId, userId, data }, {dispatch, getState, rejectWithValue}) => {
        await dispatch(refreshToken());

        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().updateUsersManager({
            companyId,
            userId,
            data,
            token: userAuth.token
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const managerSlice = createSlice({
    name: 'manager',
    initialState,
    extraReducers: (builder) => {
        builder
            //Listar usuários
            .addCase(listUsersManager.pending, (state) => {
                state.loading = true;
            })
            .addCase(listUsersManager.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(listUsersManager.rejected, (state) => {
                state.loading = false;
            })
            //Atualizar os dados pro usuário
            .addCase(updateUsersManager.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUsersManager.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(updateUsersManager.rejected, (state) => {
                state.loading = false;
            })            
    }
});

export default managerSlice.reducer;