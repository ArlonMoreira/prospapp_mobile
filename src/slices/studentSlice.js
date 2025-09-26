//Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    data: [],
    loadingRegister: false,
    loadingList: true,
    loadingChange: false,
    loadingRemove: false,
    success: false,
    loadingCall: false,
    successCall: false,
    errorRegister: false,
    errorsRegister: [],
    errorMenssageRegister: null,
    successChange: false,
    errorChange: false,
    errorsChange: [],
    errorMenssageChange: null,
    successRemove: false,
};

export const list = createAsyncThunk(
    'student/list',
    async({classId, date}, {getState, rejectWithValue}) => {
        const [dia, mes, ano] = date.split("/");

        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().studentList({
            classId,
            date: `${ano}${mes}${dia}`,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5MjY4MTM2LCJpYXQiOjE3NTg4MzYxMzYsImp0aSI6ImZiYWFkN2ZjNThlMTQxZTlhMGQxOWI0YWJkZjQ2NTg3IiwidXNlcl9pZCI6MX0.acXiUBPtmbN0nbZTkti9S752NKFPcj4g93e433BZ8Js"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }    
    }
);

export const register = createAsyncThunk(
    'student/register',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().studentRegister({
            data,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5MjY4MTM2LCJpYXQiOjE3NTg4MzYxMzYsImp0aSI6ImZiYWFkN2ZjNThlMTQxZTlhMGQxOWI0YWJkZjQ2NTg3IiwidXNlcl9pZCI6MX0.acXiUBPtmbN0nbZTkti9S752NKFPcj4g93e433BZ8Js"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const call = createAsyncThunk(
    'student/call',
    async(data, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth; //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5MjY4MTM2LCJpYXQiOjE3NTg4MzYxMzYsImp0aSI6ImZiYWFkN2ZjNThlMTQxZTlhMGQxOWI0YWJkZjQ2NTg3IiwidXNlcl9pZCI6MX0.acXiUBPtmbN0nbZTkti9S752NKFPcj4g93e433BZ8Js"
        const response = await useRequest().callRegister({
            data,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5MjY4MTM2LCJpYXQiOjE3NTg4MzYxMzYsImp0aSI6ImZiYWFkN2ZjNThlMTQxZTlhMGQxOWI0YWJkZjQ2NTg3IiwidXNlcl9pZCI6MX0.acXiUBPtmbN0nbZTkti9S752NKFPcj4g93e433BZ8Js"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }                
    }
);

export const change = createAsyncThunk(
    'student/change',
    async({student, data}, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().studentChange({
            student,
            data,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5MjY4MTM2LCJpYXQiOjE3NTg4MzYxMzYsImp0aSI6ImZiYWFkN2ZjNThlMTQxZTlhMGQxOWI0YWJkZjQ2NTg3IiwidXNlcl9pZCI6MX0.acXiUBPtmbN0nbZTkti9S752NKFPcj4g93e433BZ8Js"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
);

export const remove = createAsyncThunk(
    'student/remove',
    async(student, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().studentRemove({
            student,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU5MjY4MTM2LCJpYXQiOjE3NTg4MzYxMzYsImp0aSI6ImZiYWFkN2ZjNThlMTQxZTlhMGQxOWI0YWJkZjQ2NTg3IiwidXNlcl9pZCI6MX0.acXiUBPtmbN0nbZTkti9S752NKFPcj4g93e433BZ8Js"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }

    }
)

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        resetState:(state) => {
            state.loadingList = true;
            state.data = [];
        },
        resetRegisterForm:(state) => {
            state.success = false;
            state.errorRegister = false;
            state.errorsRegister = [];
            state.errorMenssageRegister = null;
        },
        resetChangeForm:(state) => {
            state.successChange = false;
            state.errorChange = false;
            state.errorsChange = [];
            state.errorMenssageChange = null;        
        }
    },
    extraReducers: (builder) => {
        builder
            //Aguardando remoção de aluno
            .addCase(remove.pending, (state) => {
                state.loadingRemove = true;
                state.successRemove = false;
            })
            //Sucesso ao remover um aluno
            .addCase(remove.fulfilled, (state, action) => {
                state.loadingRemove = false;
                
                if (!action.payload.data.is_active){//Os usuários de fato não são removidos, mas inativados.
                    const newData = state.data.filter(data => data.id !== action.payload.data.id);
                    state.data = newData;
                    state.successRemove = true;
                }

            })
            //Aguardando cadastro
            .addCase(register.pending, (state) => {
                state.loadingRegister = true;
                state.success = false;
                state.errorRegister = false;
                state.errorsRegister = [];
                state.errorMenssageRegister = null;                  
            })
            //Sucesso cadastro
            .addCase(register.fulfilled, (state, action) => {
                state.loadingRegister = false;
                state.success = true;
                state.errorRegister = false;
                state.data.push(action.payload.data);
                state.errorsRegister = [];
                state.errorMenssageRegister = null;
            })
            //Falha do cadastro
            .addCase(register.rejected, (state, action) => {
                state.loadingRegister = false;
                state.success = false;
                state.errorRegister = true;
                state.errorsRegister = action.payload.data;
                state.errorMenssageRegister = action.payload.message;
            })
            //Aguardando lista
            .addCase(list.pending, (state) => {
                state.loadingList = true;
            })
            //Sucesso lista
            .addCase(list.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loadingList = false;
            })
            //Falha de listagem
            .addCase(list.rejected, (state) => {
                state.loadingList = false;
            })
            //Aguardando finalizar chamada
            .addCase(call.pending, (state) => {
                state.loadingCall = true;
                state.successCall = false;
            })
            //Sucesso chamada
            .addCase(call.fulfilled, (state, action) => {

                const studentDataMap = new Map(
                    action.payload.data.map(student => [student.student, student])
                );

                state.data = state.data.map(data => {
                    const student = studentDataMap.get(data.id);
                    if(student){
                        return {
                            ...data,
                            date: student.date,
                            present: student.present
                        }
                    }

                    return data;

                });

                state.loadingCall = false;
                state.successCall = true;

            })
            //Aguardando alterar
            .addCase(change.pending, (state) => {
                state.loadingChange = true;
                state.successChange = false;
                state.errorChange = false;
                state.errorsChange = [];
                state.errorMenssageChange = null;
            })
            //Sucesso ao alterar
            .addCase(change.fulfilled, (state, action) => {
                state.data = state.data.map(data => {
                    if(data.id === action.payload.data.id){
                        data.name = action.payload.data.name;
                        data.identification_number = action.payload.data.identification_number;
                    }

                    return data;

                });
                state.loadingChange = false;
                state.successChange = true;
                state.errorChange = false;
                state.errorsChange = [];
                state.errorMenssageChange = null;                
                
            })
            //Falha ao alterar
            .addCase(change.rejected, (state, action) => {
                state.loadingChange = false;
                state.successChange = false;
                state.errorChange = true;
                state.errorsChange = action.payload.data;
                state.errorMenssageChange = action.payload.message;                
            })
    }
});

export const { resetRegisterForm, resetChangeForm, resetState } = studentSlice.actions;
export default studentSlice.reducer;