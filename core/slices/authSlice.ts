import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    apiToken: null,
    refreshToken: null,
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setApiToken: (state, action) => {
      state.apiToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.apiToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
  },
});
export const selectUser = (state: { auth: { user: any; }; }) => state.auth.user;
export const selectIsLoggedIn = (state: { auth: { isLoggedIn: boolean; }; }) => state.auth.isLoggedIn;
export const { setUser, setApiToken, setRefreshToken, setIsLoggedIn, logout } = authSlice.actions;