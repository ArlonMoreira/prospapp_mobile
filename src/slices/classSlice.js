//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loadingRegister: false,
    loadingList: false,
    loadingChange: false,
    loadingRemove: false,
    success: false,
    error: false
};

export const register = createAsyncThunk(
    'class/register',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().classRegister({
            data,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NjI3NzA5LCJpYXQiOjE3MzcxOTU3MDksImp0aSI6ImEyOGVjYmEyZDUxMTQ2NGFiMTYzYTgxZDRjYzkwYmUyIiwidXNlcl9pZCI6MX0.90lQoS54UasIKjYzniEifVtzLndXDt1fYEZR0uZSFnQ'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const list = createAsyncThunk(
    'class/list',
    async(company, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().classList({
            company,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NjI3NzA5LCJpYXQiOjE3MzcxOTU3MDksImp0aSI6ImEyOGVjYmEyZDUxMTQ2NGFiMTYzYTgxZDRjYzkwYmUyIiwidXNlcl9pZCI6MX0.90lQoS54UasIKjYzniEifVtzLndXDt1fYEZR0uZSFnQ'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        

    }
);

export const change = createAsyncThunk(
    'class/change',
    async({classId, data}, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //userAuth.token
        const response = await useRequest().classChange({
            classId,
            data,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NjI3NzA5LCJpYXQiOjE3MzcxOTU3MDksImp0aSI6ImEyOGVjYmEyZDUxMTQ2NGFiMTYzYTgxZDRjYzkwYmUyIiwidXNlcl9pZCI6MX0.90lQoS54UasIKjYzniEifVtzLndXDt1fYEZR0uZSFnQ'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const remove = createAsyncThunk(
    'class/remove',
    async(classId, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().classRemove({
            classId,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NjI3NzA5LCJpYXQiOjE3MzcxOTU3MDksImp0aSI6ImEyOGVjYmEyZDUxMTQ2NGFiMTYzYTgxZDRjYzkwYmUyIiwidXNlcl9pZCI6MX0.90lQoS54UasIKjYzniEifVtzLndXDt1fYEZR0uZSFnQ'
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
)

export const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        resetErrorStatus:(state) =>{
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            //Aguardando cadastro
            .addCase(register.pending, (state) => {
                state.loadingRegister = true;
                state.success = false;
                state.error = false;     
            })
            //Sucesso cadastro
            .addCase(register.fulfilled, (state, action) => {
                state.loadingRegister = false;
                state.success = true;
                state.error = false;
                state.data.push(action.payload.data);
            })
            //Falha do cadastro
            .addCase(register.rejected, (state) => {
                state.loadingRegister = false;
                state.success = false;
                state.error = true;
            })
            //Aguardando grupos
            .addCase(list.pending, (state, action) => {
                state.loadingList = true;
            })
            //Listar grupos
            .addCase(list.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loadingList = false;
            })
            //Falha ao lista grupos
            .addCase(list.rejected, (state, action) => {
                state.loadingList = false;
            })
            //Aguardando alteração
            .addCase(change.pending, (state) => {
                state.loadingChange = true;
            })
            //Sucesso alteração
            .addCase(change.fulfilled, (state, action) => {
                state.loadingChange = false;

                const updatedItem = action.payload.data;
                const newData = state.data.map((item) => 
                    item.id === updatedItem.id ? { ...item, name: updatedItem.name } : item
                );

                state.data = newData;

            })
            //Falha ao remover turma
            .addCase(remove.pending, (state) => {
                state.loadingRemove = true;
            })
            //Sucesso ao remover turma
            .addCase(remove.fulfilled, (state, action) => {
                state.loadingRemove = false;
                
                if(action.payload.data && !action.payload.data.is_active){
                    const newData = state.data.filter((data) => data.id !== action.payload.data.id);
                    state.data = newData;
                }

            })

    }
});

export const { resetErrorStatus } = classSlice.actions;
export default classSlice.reducer;