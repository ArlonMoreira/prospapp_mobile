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
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().reportCall({
            classId: data.classId,
            year: data.year,
            month: data.month,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0MTE2ODk3LCJpYXQiOjE3MzM2ODQ4OTcsImp0aSI6IjAyOTVhZTQ2ZjYyODQxNDlhNWVlNDVkMTg1YjVkYmJlIiwidXNlcl9pZCI6MX0.5XNyzq42a6haiG09L_mBKnw828hks9HPcQXcq2k6bb4'
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
                state.loading = false;
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