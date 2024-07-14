//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    success: false,
    false: false,
    loading: false,
};

export const list = createAsyncThunk(
    'companys/list',
    async(_, { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth; //Obter token que encontra-se no estado de autenticação
        const response = await useRequest().companyList(userAuth.token);
        console.log(userAuth)
        console.log(response)
        if(response.ok){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const companysSlice = createSlice({
    name: 'companys',
    initialState,
    extraReducers: (builder)=>{
        builder
            .addCase(list.pending, (state)=>{
                state.loading = true;
            })
    }
});

export default companysSlice.reducer;
