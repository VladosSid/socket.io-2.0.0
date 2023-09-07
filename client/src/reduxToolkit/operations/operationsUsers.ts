import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit';

import { instanceApi } from './instance'

import type { IUser, IStateUser } from '../types/slices'
import type { IUserReq } from '../types/operations'

const token = {
  set(token:string) {
    instanceApi.defaults.headers.authorization = `${token}`;
  },
  unset() {
    instanceApi.defaults.headers.authorization = '';
  },
};

const signIn = createAsyncThunk<IUser, IUserReq, { rejectValue: string }>(
  'auth/signIn',
  async (userData, thunkAPI) => {
    try {
      const { data } = await instanceApi.post('/auth/signup', userData);
      
      token.set(data.data.user.id);
      return data.data;
    } catch (err: any) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
)

const login = createAsyncThunk<IUser, IUserReq, { rejectValue: string }>(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const { data } = await instanceApi.post('/auth/login', userData);
      
      token.set(data.data.id);
      return data.data;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log('error message: ', err.message);
        alert('Invalid Login or Password!!!')
        return thunkAPI.rejectWithValue(err.message);
      } else {
        console.log('unexpected error: ', err);
        return 'An unexpected error occurred';
      }
    }
  }
)

const current = createAsyncThunk<IUser, any, { rejectValue: string }>(
  'auth/current',
  async (_, thunkAPI) => {
    
    const state = thunkAPI.getState() as IStateUser;
    const persistedToken = state.user.id;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('');
    }

    token.set(persistedToken);
    
    try {
      const { data } = await instanceApi.get('/auth/current');
      
      return data.data;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log('error message: ', err.message);
        alert('User not authorized!!!')
        return thunkAPI.rejectWithValue(err.message);
      } else {
        console.log('unexpected error: ', err);
        return 'An unexpected error occurred';
      }
    }
  }
)

const logout = createAsyncThunk<any, any, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const resp = await instanceApi.get('/auth/logout');
      
      token.unset()
      return resp;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log('error message: ', err.message);
        alert('User not authorized!!!')
        return thunkAPI.rejectWithValue(err.message);
      } else {
        console.log('unexpected error: ', err);
        return 'An unexpected error occurred';
      }
    }
  }
)

const operations = {
  signIn,
  login,
  current,
  logout,
} 

export default operations
