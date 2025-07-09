import * as Location from 'expo-location';
//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//Hooks
import useRequest from "../hooks/useRequest";

const initialState = {
    loading: false,
    loadingRemove: false,
    successRemove: false,
    errorMessage: null,
    open_point: {},
    all_points_today: []
};

export const register = createAsyncThunk(
    'registerPoint/register',
    async(data, {getState, rejectWithValue, dispatch}) => {
        // Inicia o loading antes da captura de coordenadas

        let { status } = await Location.requestForegroundPermissionsAsync();

        if ( status !== 'granted' ) {
          alert('Permissão para acessar a localização foi negada');
          return;
        }
    
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
            maximumAge: 0, // força a não reutilizar cache
            timeout: 10000 // tempo limite opcional
        });

        const { latitude, longitude } = location.coords;

        data = {
            ...data,
            latitude,
            longitude
        };

        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointRegister({
            data,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNDQyMTYwLCJpYXQiOjE3NTIwMTAxNjAsImp0aSI6ImQ3ZTc3N2I3ZDQxODRlZjM4YmM3YTBkMmQ4ZjY3MjRhIiwidXNlcl9pZCI6MX0.4BYgdnVDzL15ziREM0Z--MYaqYQOIrCT_supqZLM4i4"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        
    }
);

export const list = createAsyncThunk(
    'registerPoint/list',
    async(localId, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointList({
            localId,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNDQyMTYwLCJpYXQiOjE3NTIwMTAxNjAsImp0aSI6ImQ3ZTc3N2I3ZDQxODRlZjM4YmM3YTBkMmQ4ZjY3MjRhIiwidXNlcl9pZCI6MX0.4BYgdnVDzL15ziREM0Z--MYaqYQOIrCT_supqZLM4i4"
        });

        if(response.success){
            return response;
        } else {
            return rejectWithValue(response);
        }        
    }
);

export const removePointToday = createAsyncThunk(
    'registerPoint/removePointToday',
    async(pointId, {getState, rejectWithValue}) => {
        const userAuth = await getState().auth.userAuth;
        const response = await useRequest().pointRemoveToday({
            pointId,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNDQyMTYwLCJpYXQiOjE3NTIwMTAxNjAsImp0aSI6ImQ3ZTc3N2I3ZDQxODRlZjM4YmM3YTBkMmQ4ZjY3MjRhIiwidXNlcl9pZCI6MX0.4BYgdnVDzL15ziREM0Z--MYaqYQOIrCT_supqZLM4i4"
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
            state.successRemove = false;
            state.errorMessage = null;
        },
        startLoading: (state) => {
            state.loading = true;
        },
        resetErrorMessage: (state) => {
            state.errorMessage = null;
        }
    },    
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.errorMessage = null;
                state.open_point = action.payload.data;
                // Substitui se encontrar pelo id, senão adiciona
                const newPoint = action.payload.data;
                const index = state.all_points_today.findIndex(p => p.id === newPoint.id);
            
                if (index !== -1) {
                    state.all_points_today[index] = newPoint;
                } else {
                    state.all_points_today.push(newPoint);
                }

            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
            })
            .addCase(list.pending, (state) => {
                state.loading = true;
            })
            .addCase(list.fulfilled, (state, action) => {
                state.loading = false;
                state.open_point = action.payload.data.open_point;
                state.all_points_today = action.payload.data.all_points_today;
            })  
            .addCase(list.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(removePointToday.pending, (state) => {
                state.loadingRemove = true;
                state.successRemove = false;
            })
            .addCase(removePointToday.fulfilled, (state, action) => {
                state.loadingRemove = false;
                state.successRemove = true;
                //Selecionar o ponto que será removido
                const removePoint = action.payload.data;
                const index = state.all_points_today.findIndex(p => p.id === removePoint.id);
            
                if (index !== -1) {
                   state.all_points_today.splice(index, 1);
                }

                state.open_point = {};

            })
            .addCase(removePointToday.rejected, (state, action) => {
                state.loadingRemove = false;
                state.successRemove = false;
            })                                  
    }    
});

export const { resetForm, startLoading, resetErrorMessage } = registerPointSlice.actions;
export default registerPointSlice.reducer;