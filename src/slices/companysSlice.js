//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refreshToken } from "./authSlice";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loadingList: false,
    loadingPending: false
};

export const list = createAsyncThunk(
    'companys/list',
    async(_, {dispatch, getState, rejectWithValue}) => {
        await dispatch(refreshToken());

        const userAuth = await getState().auth.userAuth; //Obter token que encontra-se no estado de autenticação
        const response = await useRequest().companyList(userAuth.token)

        if(response.success){          
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const sendRequest = createAsyncThunk(
    'companys/pending',
    async(data, {dispatch, getState, rejectWithValue}) => {
        await dispatch(refreshToken());
        
        const userAuth = await getState().auth.userAuth; //Obter token que encontra-se no estado de autenticação
        const response = await useRequest().companyPending({
            data,
            token: userAuth.token
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }
    }
)

export const companysSlice = createSlice({
    name: 'companys',
    initialState,
    extraReducers: (builder)=>{
        builder
            .addCase(list.pending, (state)=>{
                state.loadingList = true;
            })
            .addCase(list.fulfilled, (state, action)=>{
                state.loadingList = false;
                state.data = action.payload.data;
            })
            .addCase(sendRequest.pending, (state)=>{
                state.loadingPending = true;
            })
            .addCase(sendRequest.fulfilled, (state, action)=>{
                state.loadingPending = false;
                state.data = action.payload.data;
            });
    }
});

export default companysSlice.reducer;
