//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loading: false,
    loadingRegister: false,
    successRemove: false,
    errorMessage: null,
    loadingRemove: false,
    successRegister: false,
    errors: []
};

export const list = createAsyncThunk(
    'pointLocals/list',
    async(companyId, {getState, rejectWithValue}) => {
        
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointLocalsList({
            companyId,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMTk3ODEyLCJpYXQiOjE3NTI3NjU4MTIsImp0aSI6ImQyMDBjN2FhMTI4MTQzYzNiNWVlY2E5NWI0MWY5YTkyIiwidXNlcl9pZCI6MX0.o_IXSLRfpRheUGxIHeLSXXdxBWf4qXN3WZ3xzo-5uCQ"
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
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMTk3ODEyLCJpYXQiOjE3NTI3NjU4MTIsImp0aSI6ImQyMDBjN2FhMTI4MTQzYzNiNWVlY2E5NWI0MWY5YTkyIiwidXNlcl9pZCI6MX0.o_IXSLRfpRheUGxIHeLSXXdxBWf4qXN3WZ3xzo-5uCQ"
        });
        
        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        
    }
);

export const change = createAsyncThunk(
    'pointLocals/change',
    async({data, localId}, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointLocalEdit({
            data,
            localId,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMTk3ODEyLCJpYXQiOjE3NTI3NjU4MTIsImp0aSI6ImQyMDBjN2FhMTI4MTQzYzNiNWVlY2E5NWI0MWY5YTkyIiwidXNlcl9pZCI6MX0.o_IXSLRfpRheUGxIHeLSXXdxBWf4qXN3WZ3xzo-5uCQ"
        });
        
        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        
    }
);

export const remove = createAsyncThunk(
    'pointLocals/remove',
    async(localId, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointLocalRemove({
            localId,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMTk3ODEyLCJpYXQiOjE3NTI3NjU4MTIsImp0aSI6ImQyMDBjN2FhMTI4MTQzYzNiNWVlY2E5NWI0MWY5YTkyIiwidXNlcl9pZCI6MX0.o_IXSLRfpRheUGxIHeLSXXdxBWf4qXN3WZ3xzo-5uCQ"
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
            state.loading = false;
            state.loadingRegister = false;
            state.loadingRemove = false;
            state.successRemove = false;
            state.errorMessage = null;
            state.successRegister = false;
            state.errors = []
        },
        resetErrorMessage: (state) => {
            state.errorMessage = null;
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
                state.successRegister = false;
            })
            //Sucesso ao cadastrar local
            .addCase(register.fulfilled, (state, action) => {
                state.loadingRegister = false;
                state.successRegister = true;
                state.data.push(action.payload.data);
            })
            //Falha ao cadastrar local
            .addCase(register.rejected, (state, action) => {
                state.successRegister = false;
                state.loadingRegister = false;
                state.errors = action.payload.data;
                state.errorMessage = action.payload.message;
            })
            //Aguardando carregamento alteração de local
            .addCase(change.pending, (state) => {
                state.loadingRegister = true;
                state.successRegister = false;
            })   
            //Sucesso ao editar local
            .addCase(change.fulfilled, (state, action) => {
                state.loadingRegister = false;
                state.successRegister = true;
                const index = state.data.findIndex(obj => obj.id === action.payload.data.id);
                if(index > -1){
                    state.data[index] = action.payload.data;
                }

            })
            //Falha ao editar local
            .addCase(change.rejected, (state, action) => {
                state.successRegister = false;
                state.loadingRegister = false;
                state.errors = action.payload.data;
                state.errorMessage = action.payload.message;
            })
            //Carregando remove local
            .addCase(remove.pending, (state) => {
                state.loadingRemove = true;
                state.successRemove = false;
            })     
            //Sucesso ao remover local
            .addCase(remove.fulfilled, (state, action) => {
                state.loadingRemove = false;
                state.successRemove = true;
                
                const index = state.data.findIndex(obj => obj.id === action.payload.data.id);
                if(index > -1){
                    state.data.splice(index, 1);
                }                
            })                                  
    }
});

export const { resetForm, resetErrorMessage } = pointLocalsSlice.actions;
export default pointLocalsSlice.reducer;
