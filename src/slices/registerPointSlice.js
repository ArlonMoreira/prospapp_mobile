//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loading: false,
};

export const register = createAsyncThunk(
    'registerPoint/register',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointRegister({
            data,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NTQyNzY5LCJpYXQiOjE3NDYxMTA3NjksImp0aSI6Ijg1ZDM0YjgxNmRiZjRmZWY5MTE0NDNiMTNhN2ZkNmY0IiwidXNlcl9pZCI6MX0.tLl5zWXJy1Oz5SvBSAqAVbWIIBXfN6B-VscB5o3DnuA"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        
    }
);

export const registerPointSlice = createSlice({
    name: 'registerPoint',
    initialState,
    reducers: {
        resetForm: (state) => {
        }
    },    
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
            })
    }    
});

export const { resetForm } = registerPointSlice.actions;
export default registerPointSlice.reducer;