//Redux
import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data:[],
    loading: false
};

export const listUsersManager = createAsyncThunk(
    'manager/list',
    async(companyId,  { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().listUsersManager({
            companyId,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMDU4OTgzLCJpYXQiOjE3NTI2MjY5ODMsImp0aSI6Ijg3YTY3NmI1MWNiMzQxYzg4ZmY1MmY1YTZhODM3NmMwIiwidXNlcl9pZCI6MX0.s9sNTMqSjSmLKXU4au9ZbqDG2JBhX0hfhjVYdMMoOkY"
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
    async({ companyId, userId, data }, { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().updateUsersManager({
            companyId,
            userId,
            data,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMDU4OTgzLCJpYXQiOjE3NTI2MjY5ODMsImp0aSI6Ijg3YTY3NmI1MWNiMzQxYzg4ZmY1MmY1YTZhODM3NmMwIiwidXNlcl9pZCI6MX0.s9sNTMqSjSmLKXU4au9ZbqDG2JBhX0hfhjVYdMMoOkY"
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