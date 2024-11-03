//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";
import classSlice from "./classSlice";

const initialState = {
    data: {},
    loading: false,
    success: false,
    error: false
};

export const call = createAsyncThunk(
    'report/call',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().reportCall({
            classId: data.classId,
            year: data.year,
            month: data.month,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwOTkxOTg0LCJpYXQiOjE3MzA1NTk5ODQsImp0aSI6ImQ4NTM0OWRhMTYxODRmOTU4MDY0YWVmMGZiYzRjNjViIiwidXNlcl9pZCI6MX0.3DtQvq9dJKrl2LBp8KPQGXadcvniBm5nPSTAhYP_yso'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);

        }
    }
);

export const callSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        reset: (state) => {
            state.data = {}
        }
    },
    extraReducers: (builder) => {
        builder
            //Aguardando gerar o relatório
            .addCase(call.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = false;
            })
            //Sucesso carregar dados relatorio
            .addCase(call.fulfilled, (state, action) => {
                state.data = action.payload;
                state.success = true;
                state.loading = false;
            })
            //Erro ao gerar o relatorio
            .addCase(call.rejected, (state) => {
                state.data = {};
                state.success = false;
                state.loading = false;
                state.error = true;
            })
    }
});

export const { reset } = callSlice.actions;
export default callSlice.reducer;