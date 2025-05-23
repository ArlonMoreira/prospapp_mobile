//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loadingList: false,
    loadingPending: false
};

export const list = createAsyncThunk(
    'companys/list',
    async(_, { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth; //Obter token que encontra-se no estado de autenticação
        const response = await useRequest().companyList("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4NDY0NzE4LCJpYXQiOjE3NDgwMzI3MTgsImp0aSI6ImZmMDJmODkzMTlhYzRlYTNiODVmZjI0NzU1ZDhhNGQ2IiwidXNlcl9pZCI6MX0.CZWOuUWDC3xkb2F5S4PbaeM-t66Pp1K89dMoBE7P1eg")

        if(response.success){          
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const sendRequest = createAsyncThunk(
    'companys/pending',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //Obter token que encontra-se no estado de autenticação
        const response = await useRequest().companyPending({
            data,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4NDY0NzE4LCJpYXQiOjE3NDgwMzI3MTgsImp0aSI6ImZmMDJmODkzMTlhYzRlYTNiODVmZjI0NzU1ZDhhNGQ2IiwidXNlcl9pZCI6MX0.CZWOuUWDC3xkb2F5S4PbaeM-t66Pp1K89dMoBE7P1eg"
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
