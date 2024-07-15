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
        //const userAuth = await getState().auth.userAuth; //Obter token que encontra-se no estado de autenticação
        const response = await useRequest().companyList('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxNDE0NDA2LCJpYXQiOjE3MjA5ODI0MDYsImp0aSI6IjEwZjQ5YmE5NDc4MDRjMzdhNWE5ODA4N2ZlNTUwMDkwIiwidXNlcl9pZCI6MX0.YiajwKljdm8GVl7wX9yPf8rLpvDaATJ85M67RWiB3Yg');
       
        if(response.success){          
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
            .addCase(list.fulfilled, (state, action)=>{
                state.success = true;
                state.false = false;
                state.loading = false;
                state.data = action.payload.data;
            })
    }
});

export default companysSlice.reducer;
