import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://connections-api.goit.global/'

// Utility to add JWT
const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };
  
  // Utility to remove JWT
  const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
  };

//user registration
export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI)=>{
        try {
            const response = await axios.post('auth/register', userData);
            setAuthHeader (response.data.token);
            return response.data
            
        } catch (e) {

            return thunkAPI.rejectWithValue(e.message);
            
        }
    }
)

// User login
export const login = createAsyncThunk(
    'auth/login',
    async (loginData, thunkAPI) =>{
        try {
            const response = await axios.post ('auth/login', loginData);
            setAuthHeader (response.data.token)
            return response.data
            
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
       
            
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) =>{
        try {
            const response = await axios.post ('auth/logout');
            clearAuthHeader();
            return response.data
            
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

// Refresh user
export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) =>{
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;
        if (persistedToken === null) {
            
            return thunkAPI.rejectWithValue('Unable to fetch user');
          }
        try {
            setAuthHeader(persistedToken);
            const response = await axios.get ('auth/refresh');
            return response.data
            
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)