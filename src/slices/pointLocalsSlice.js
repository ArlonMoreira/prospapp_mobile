//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loading: true,
    loadingRegister: false,
    successRegister: false,
    errosRegister: [],
    loadingChange: false,
    successChange: false,
    errorsChange: [],
    loadingRemove: false,
    successRemove: false
};

export const list = createAsyncThunk(
    'pointLocals/list',
    async(companyId, {getState, rejectWithValue}) => {
        
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointLocalsList({
            companyId,
            token: userAuth.token
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }    
);

export const register = createAsyncThunk(
    'pointLocals/register',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointLocalRegister({
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

export const change = createAsyncThunk(
    'pointLocals/change',
    async({data, localId}, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointLocalEdit({
            data,
            localId,
            token: userAuth.token
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        
    }
);

export const remove = createAsyncThunk(
    'pointLocals/remove',
    async(localId, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointLocalRemove({
            localId,
            token: userAuth.token
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        
    }
);

export const pointLocalsSlice = createSlice({
    name: 'pointLocals',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = true;
            state.data = [];
        },
        resetStateRegister: (state) => {
            state.successRegister = false;
            state.loadingRegister = false;
            state.errosRegister = [];
        },
        resetStateChange: (state) => {
            state.successChange = false;
            state.loadingChange = false;
            state.errorsChange = [];
        }
    },
    extraReducers: (builder) => {
        builder
            //Aguardando carregamento locais de pontos
            .addCase(list.pending, (state) => {
                state.loading = true;
            })
            //Listar locais de pontos
            .addCase(list.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            //Erro ao carregar locais de pontos
            .addCase(list.rejected, (state) => {
                state.loading = false;
            })
            //Aguardando o carregamento do cadastro de local
            .addCase(register.pending, (state) => {
                state.loadingRegister = true;
                state.successRegister = false;
            })
            //Sucesso ao cadastrar local
            .addCase(register.fulfilled, (state, action) => {
                state.loadingRegister = false;
                state.successRegister = true;
                state.data.push(action.payload.data);
            })
            //Falha ao cadastrar local
            .addCase(register.rejected, (state, action) => {
                state.loadingRegister = false;
                state.successRegister = false;
                state.errosRegister = action.payload.data;
            })   
            //Aguardando carregamento alteração de local
            .addCase(change.pending, (state) => {
                state.loadingChange = true;
                state.successChange = false;
            })   
            //Sucesso ao editar local
            .addCase(change.fulfilled, (state, action) => {
                state.loadingChange = false;
                state.successChange = true;

                const index = state.data.findIndex(obj => obj.id === action.payload.data.id);
                if(index > -1){
                    state.data[index] = action.payload.data;
                }

            })
            //Falha ao editar local
            .addCase(change.rejected, (state, action) => {
                state.loadingChange = false;
                state.successChange = false;
                state.errorsChange = action.payload.data;
            })
            //Carregando remove local
            .addCase(remove.pending, (state) => {
                state.loadingRemove = true;
                state.successRemove = false;
            })     
            //Sucesso ao remover local
            .addCase(remove.fulfilled, (state, action) => {
                state.loadingRemove = false;
                state.successRemove = true;
                
                const index = state.data.findIndex(obj => obj.id === action.payload.data.id);
                if(index > -1){
                    state.data.splice(index, 1);
                }                
            })
            //Falha ao remover local
            .addCase(remove.rejected, (state) => {
                state.loadingRemove = false;
                state.successRemove = false;
            })                                                                   
    }
});

export const { resetState, resetStateRegister, resetStateChange } = pointLocalsSlice.actions;
export default pointLocalsSlice.reducer;


// const initialState = {
//     data: [],
//     loading: true,
//     loadingRegister: false,
//     successRemove: false,
//     errorMessage: null,
//     loadingRemove: false,
//     successRegister: false,
//     successChange: false,
//     errors: []
// };

// export const list = createAsyncThunk(
//     'pointLocals/list',
//     async(companyId, {getState, rejectWithValue}) => {
        
//         const userAuth = await getState().auth.userAuth;
//         const response = await useRequest().pointLocalsList({
//             companyId,
//             token: userAuth.token
//         });

//         if(response.success){
//             return response;
//         } else {
//             return rejectWithValue(response);
//         }

//     }    
// );

// export const register = createAsyncThunk(
//     'pointLocals/register',
//     async(data, {getState, rejectWithValue}) => {
//         const userAuth = await getState().auth.userAuth;
//         const response = await useRequest().pointLocalRegister({
//             data,
//             token: userAuth.token
//         });
        
//         if(response.success){
//             return response;
//         } else {
//             return rejectWithValue(response);
//         }        
//     }
// );

// export const change = createAsyncThunk(
//     'pointLocals/change',
//     async({data, localId}, {getState, rejectWithValue}) => {
//         const userAuth = await getState().auth.userAuth;
//         const response = await useRequest().pointLocalEdit({
//             data,
//             localId,
//             token: userAuth.token
//         });

//         if(response.success){
//             return response;
//         } else {
//             return rejectWithValue(response);
//         }        
//     }
// );

// export const remove = createAsyncThunk(
//     'pointLocals/remove',
//     async(localId, {getState, rejectWithValue}) => {
//         const userAuth = await getState().auth.userAuth;
//         const response = await useRequest().pointLocalRemove({
//             localId,
//             token: userAuth.token
//         });

//         if(response.success){
//             return response;
//         } else {
//             return rejectWithValue(response);
//         }        
//     }
// );


// export const pointLocalsSlice = createSlice({
//     name: 'pointLocals',
//     initialState,
//     reducers: {
//         resetState: (state) => {
//             state.loading = true;
//             state.data = [];
//         },
//         resetForm: (state) => {
//             state.loading = false;
//             state.loadingRegister = false;
//             state.loadingRemove = false;
//             state.successRemove = false;
//             state.errorMessage = null;
//             state.successRegister = false;
//             state.successChange = false;
//             state.errors = []
//         },
//         resetErrorMessage: (state) => {
//             state.errorMessage = null;
//         }        
//     },
//     extraReducers: (builder) => {
//         builder
//             //Aguardando carregamento locais de pontos
//             .addCase(list.pending, (state) => {
//                 state.loading = true;
//             })
//             //Listar locais de pontos
//             .addCase(list.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = action.payload.data;
//             })
//             //Erro ao carregar locais de pontos
//             .addCase(list.rejected, (state) => {
//                 state.loading = false;
//             })
//             //Aguardando o carregamento do cadastro de local
//             .addCase(register.pending, (state) => {
//                 state.loadingRegister = true;
//                 state.successRegister = false;
//             })
//             //Sucesso ao cadastrar local
//             .addCase(register.fulfilled, (state, action) => {
//                 state.loadingRegister = false;
//                 state.successRegister = true;
//                 state.data.push(action.payload.data);
//             })
//             //Falha ao cadastrar local
//             .addCase(register.rejected, (state, action) => {
//                 state.successRegister = false;
//                 state.loadingRegister = false;
//                 state.errors = action.payload.data;
//                 state.errorMessage = action.payload.message;
//             })
//             //Aguardando carregamento alteração de local
//             .addCase(change.pending, (state) => {
//                 state.loadingRegister = true;
//                 state.successChange = false;
//             })   
//             //Sucesso ao editar local
//             .addCase(change.fulfilled, (state, action) => {
//                 state.loadingRegister = false;
//                 state.successChange = true;
//                 const index = state.data.findIndex(obj => obj.id === action.payload.data.id);
//                 if(index > -1){
//                     state.data[index] = action.payload.data;
//                 }

//             })
//             //Falha ao editar local
//             .addCase(change.rejected, (state, action) => {
//                 state.loadingRegister = false;
//                 state.successChange = false;                
//                 state.errors = action.payload.data;
//                 state.errorMessage = action.payload.message;
//             })
//             //Carregando remove local
//             .addCase(remove.pending, (state) => {
//                 state.loadingRemove = true;
//                 state.successRemove = false;
//             })     
//             //Sucesso ao remover local
//             .addCase(remove.fulfilled, (state, action) => {
//                 state.loadingRemove = false;
//                 state.successRemove = true;
                
//                 const index = state.data.findIndex(obj => obj.id === action.payload.data.id);
//                 if(index > -1){
//                     state.data.splice(index, 1);
//                 }                
//             })                                  
//     }
// });

// export const { resetForm, resetErrorMessage, resetState } = pointLocalsSlice.actions;
// export default pointLocalsSlice.reducer;
