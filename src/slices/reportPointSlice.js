//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refreshToken } from "./authSlice";
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
    async(data, {dispatch, getState, rejectWithValue}) => {
        await dispatch(refreshToken());

        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointReport({
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
