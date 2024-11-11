//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loadingRegister: false,
    loadingList: false,
    success: false,
    error: false
};

export const register = createAsyncThunk(
    'class/register',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().classRegister({
            data,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNjgzNDUxLCJpYXQiOjE3MzEyNTE0NTEsImp0aSI6IjQzMTdlMGY0NWFmNTQxYTk4NjI1MDk0YTU2MGIyMWYyIiwidXNlcl9pZCI6MX0.6OMFc17K-hrb3s5lN0It8KKHs_QlVqHCQk5tdNAyzrk'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const list = createAsyncThunk(
    'class/list',
    async(company, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().classList({
            company,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNjgzNDUxLCJpYXQiOjE3MzEyNTE0NTEsImp0aSI6IjQzMTdlMGY0NWFmNTQxYTk4NjI1MDk0YTU2MGIyMWYyIiwidXNlcl9pZCI6MX0.6OMFc17K-hrb3s5lN0It8KKHs_QlVqHCQk5tdNAyzrk'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        

    }
)

export const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        resetErrorStatus:(state) =>{
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            //Aguardando cadastro
            .addCase(register.pending, (state) => {
                state.loadingRegister = true;
                state.success = false;
                state.error = false;     
            })
            //Sucesso cadastro
            .addCase(register.fulfilled, (state, action) => {
                state.loadingRegister = false;
                state.success = true;
                state.error = false;
                state.data.push(action.payload.data);
            })
            //Falha do cadastro
            .addCase(register.rejected, (state) => {
                state.loadingRegister = false;
                state.success = false;
                state.error = true;
            })
            //Aguardando grupos
            .addCase(list.pending, (state, action) => {
                state.loadingList = true;
            })
            //Listar grupos
            .addCase(list.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loadingList = false;
            })
            //Falha ao lista grupos
            .addCase(list.rejected, (state, action) => {
                state.loadingList = false;
            })
    }
});

export const { resetErrorStatus } = classSlice.actions;
export default classSlice.reducer;