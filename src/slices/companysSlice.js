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
        //const userAuth = await getState().auth.userAuth; //Obter token que encontra-se no estado de autenticação
        const response = await useRequest().companyList('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNjM3OTM4LCJpYXQiOjE3MjIyMDU5MzgsImp0aSI6IjFmZDBmNmQyYmVhZDQxNDI5ZWY2YmZhM2RkNWZkMWFjIiwidXNlcl9pZCI6MX0.pg8u0HJrmDe8xcFbtqDammS_mFpXmb8mxt-p2OAcm5U');

        if(response.success){          
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const pending = createAsyncThunk(
    'companys/pending',
    async(data, {rejectWithValue}) => {
        //const userAuth = await getState().auth.userAuth; //Obter token que encontra-se no estado de autenticação
        const response = await useRequest().companyPending({
            data,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNjM3OTM4LCJpYXQiOjE3MjIyMDU5MzgsImp0aSI6IjFmZDBmNmQyYmVhZDQxNDI5ZWY2YmZhM2RkNWZkMWFjIiwidXNlcl9pZCI6MX0.pg8u0HJrmDe8xcFbtqDammS_mFpXmb8mxt-p2OAcm5U'
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
            .addCase(pending.pending, (state)=>{
                state.loadingPending = true;
            })
            .addCase(pending.fulfilled, (state, action)=>{
                state.loadingPending = false;
                state.data = action.payload.data;
            });
    }
});

export default companysSlice.reducer;
