import { createSlice } from '@reduxjs/toolkit';

import authOperations from '../operations/operationsUsers'
import type { IStateUser } from '../types/slices'

const initialStateUsers: IStateUser = {
  user: {
    id: null,
    name: null,
    online: false,
  },
  isLoggedIn: false,
  isGetingCurentUser: false,
  error: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialStateUsers,

  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(authOperations.signIn.fulfilled, (state, action) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.online = action.payload.online;
      state.isLoggedIn = true;
      state.error = null;
    })
    .addCase(authOperations.signIn.rejected, (state, action) => {
      state.isLoggedIn = false;
      if (action.payload) {
        state.error = action.payload;
      }
    })
    // login
    .addCase(authOperations.login.fulfilled, (state, action) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.online = action.payload.online;
      state.isLoggedIn = true;
      state.error = null;
    })
    .addCase(authOperations.login.rejected, (state, action) => {
      state.isLoggedIn = false;
      if (action.payload) {
        state.error = action.payload;
      }
    })
    // current
    .addCase(authOperations.current.pending, (state, action) => {
      state.isGetingCurentUser = true;
    })
    .addCase(authOperations.current.fulfilled, (state, action) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.online = action.payload.online;
      state.isLoggedIn = true;
      state.isGetingCurentUser = false;
      state.error = null;
    })
    .addCase(authOperations.current.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isGetingCurentUser = false;
      if (action.payload) {
        state.error = action.payload;
      }
    })
    // logOut
    .addCase(authOperations.logout.fulfilled, (state, action) => {
      state.user.id = null;
      state.user.name = null;
      state.user.online = false;
      state.isLoggedIn = false;
      state.error = null;
    })
    .addCase(authOperations.logout.rejected, (state, action) => {
      state.isLoggedIn = false;
      if (action.payload) {
        state.error = action.payload;
      }
    })
  }
})

export default authSlice.reducer;