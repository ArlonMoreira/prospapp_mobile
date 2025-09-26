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
    'report/generated',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().reportCall({
            classId: data.classId,
            year: data.year,
            month: data.month,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5MjY4MTM2LCJpYXQiOjE3NTg4MzYxMzYsImp0aSI6ImZiYWFkN2ZjNThlMTQxZTlhMGQxOWI0YWJkZjQ2NTg3IiwidXNlcl9pZCI6MX0.acXiUBPtmbN0nbZTkti9S752NKFPcj4g93e433BZ8Js"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);

        }
    }
);

export const generatedSlice = createSlice({
    name: 'report',
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

export const { resetReportState } = generatedSlice.actions;
export default generatedSlice.reducer;