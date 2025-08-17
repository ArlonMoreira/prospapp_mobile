//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loadingList: true,
};

export const list = createAsyncThunk(
    'classUsers/List',
    async({ company, classId }, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().classUsersList({
            company,
            classId,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1Nzc4MjE4LCJpYXQiOjE3NTUzNDYyMTgsImp0aSI6ImU4OGI3MzAxODM4MTQwZDdhNzNlM2JkMzI3NTM3NzI3IiwidXNlcl9pZCI6MX0.sFsk-xEdeHqE1kaGYwwmTUoP9PtR6gqkaHTAs-iopqc"//userAuth.token
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        

    }
);

export const addUser = createAsyncThunk(
    'classUsers/AddUser',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().classUsersAddUser({
            data,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1Nzc4MjE4LCJpYXQiOjE3NTUzNDYyMTgsImp0aSI6ImU4OGI3MzAxODM4MTQwZDdhNzNlM2JkMzI3NTM3NzI3IiwidXNlcl9pZCI6MX0.sFsk-xEdeHqE1kaGYwwmTUoP9PtR6gqkaHTAs-iopqc"//userAuth.token
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        

    }        
);

export const classUsersSlices = createSlice({
    name: 'classUsers',
    initialState,
    reducers: {
        resetState: (state) => {
            state.data = [];
            state.loadingList = true;        
        }
    },
    extraReducers: (builder) => {
        builder
            //Aguardando carregamento da lista de usuários
            .addCase(list.pending, (state) => {
                state.loadingList = true;
            })
            //Sucesso ao listar usuários
            .addCase(list.fulfilled, (state, action) => {
                state.loadingList = false;
                state.data = action.payload.data;
            })
            //Selecionar usuário.
            .addCase(addUser.fulfilled, (state, action) => {
                state.loadingAdd = false;
                const newUser = action.payload.data[0];
                const index = state.data.findIndex(user => user.user__id === newUser.user__id);

                if (index !== -1) {
                    state.data[index].selected = newUser.selected;
                }

            })
    }
});

export const { resetState } = classUsersSlices.actions;
export default classUsersSlices.reducer;