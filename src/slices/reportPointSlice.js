//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: null,
    loading: false,
    success: false,
    error: false
};

export const generated = createAsyncThunk(
    'reportPoint/generated',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointReport({
            data,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMDU4OTgzLCJpYXQiOjE3NTI2MjY5ODMsImp0aSI6Ijg3YTY3NmI1MWNiMzQxYzg4ZmY1MmY1YTZhODM3NmMwIiwidXNlcl9pZCI6MX0.s9sNTMqSjSmLKXU4au9ZbqDG2JBhX0hfhjVYdMMoOkY'
        });
        
        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);

        }

    }
);

export const reportPointSlice = createSlice({
    name: 'reportPoint',
    initialState,
    reducers: {
        resetReportState: (state) => {
            state.data = null
            state.success = false;
            state.loading = false;
            state.error = false;
        }
    },    
    extraReducers: (builder) => {
        builder
            //Aguardando gerar o relatório
            .addCase(generated.pending, (state) => {
                console.log('carregando')
                state.loading = true;
                state.success = false;
                state.error = false;
            })
            //Sucesso carregar dados relatorio
            .addCase(generated.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.success = true;
                //state.loading = false;
                state.error = false;
            })
            //Erro ao gerar o relatorio
            .addCase(generated.rejected, (state) => {
                state.data = {};
                state.success = false;
                state.loading = false;
                state.error = true;
            })
    }
});

export const { resetReportState } = reportPointSlice.actions;
export default reportPointSlice.reducer;
