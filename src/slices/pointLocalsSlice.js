//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loading: false,
    loadingRegister: false,
    success: false,
    errors: []
};

export const list = createAsyncThunk(
    'pointLocals/list',
    async(companyId, {getState, rejectWithValue}) => {
        
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointLocalsList({
            companyId,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NTQyNzY5LCJpYXQiOjE3NDYxMTA3NjksImp0aSI6Ijg1ZDM0YjgxNmRiZjRmZWY5MTE0NDNiMTNhN2ZkNmY0IiwidXNlcl9pZCI6MX0.tLl5zWXJy1Oz5SvBSAqAVbWIIBXfN6B-VscB5o3DnuA"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }    
);

export const register = createAsyncThunk(
    'pointLocals/register',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointLocalRegister({
            data,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NTQyNzY5LCJpYXQiOjE3NDYxMTA3NjksImp0aSI6Ijg1ZDM0YjgxNmRiZjRmZWY5MTE0NDNiMTNhN2ZkNmY0IiwidXNlcl9pZCI6MX0.tLl5zWXJy1Oz5SvBSAqAVbWIIBXfN6B-VscB5o3DnuA"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        
    }
);

export const pointLocalsSlice = createSlice({
    name: 'pointLocals',
    initialState,
    reducers: {
        resetForm: (state) => {
            state.loading = false
            state.loadingRegister = false
            state.success = false
            state.errors = []
        }
    },
    extraReducers: (builder) => {
        builder
            //Aguardando carregamento locais de pontos
            .addCase(list.pending, (state) => {
                state.loading = true;
            })
            //Listar locais de pontos
            .addCase(list.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            //Erro ao carregar locais de pontos
            .addCase(list.rejected, (state) => {
                state.loading = false;
            })
            //Aguardando o carregamento do cadastro de local
            .addCase(register.pending, (state) => {
                state.loadingRegister = true;
                state.success = false;
            })
            //Sucesso ao cadastrar local
            .addCase(register.fulfilled, (state, action) => {
                state.loadingRegister = false;
                state.success = true;
                state.data.push(action.payload.data);
            })
            //Falha ao cadastrar local
            .addCase(register.rejected, (state, action) => {
                state.success = false;
                state.loadingRegister = false;
                state.errors = action.payload.data;
            })
    }
});

export const { resetForm } = pointLocalsSlice.actions;
export default pointLocalsSlice.reducer;
