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
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ3MDE2NzU1LCJpYXQiOjE3NDY1ODQ3NTUsImp0aSI6ImEwYTYzZjU3ZDI4MDQ5NDk5NTg5Zjc0YWFjMzIxODhlIiwidXNlcl9pZCI6MX0.3OTDo7ueD6i104rRzEW0yMJ9JXxB9oQLabDag7dg0J8"
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
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ3MDE2NzU1LCJpYXQiOjE3NDY1ODQ3NTUsImp0aSI6ImEwYTYzZjU3ZDI4MDQ5NDk5NTg5Zjc0YWFjMzIxODhlIiwidXNlcl9pZCI6MX0.3OTDo7ueD6i104rRzEW0yMJ9JXxB9oQLabDag7dg0J8"
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