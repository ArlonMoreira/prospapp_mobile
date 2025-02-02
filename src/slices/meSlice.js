//Redux
import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    userData: null,
    success: false,
    loading: false,
};

export const me = createAsyncThunk(
    'auth/me',
    async(_, { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().me(userAuth.token);

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const change = createAsyncThunk(
    'auth/change',
    async(data, { getState, rejectWithValue }) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().change({
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

export const meSlice = createSlice({
    name: 'me',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(me.pending, (state) => {
                state.loading = true;
            })
            .addCase(me.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.data;
            })
            .addCase(change.pending, (state) => {
                state.loading = true;
            })
            .addCase(change.fulfilled, (state, action) => {
                state.loading = false;
                
                const newData = action.payload.data;
                state.userData.doc_number = newData.doc_number;
                state.userData.full_name = newData.full_name;
                state.userData.email = newData.email;
            })
    }
});

export default meSlice.reducer;