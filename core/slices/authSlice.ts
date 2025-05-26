import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        apiToken: null,
        refreshToken: null,
        isLoggedIn: false,
        sync_version: null,
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
        setSyncVersion: (state, action) => {
            state.sync_version = action.payload;
        },

        resetUser(state) {
            state.user = null
        }
    },
});
export const selectUser = (state: { auth: { user: User } }) => state.auth.user;
export const selectSyncVersion = (state: { auth: { sync_version: number } }) => state.auth.sync_version;
export const selectIsLoggedIn = (state: { auth: { isLoggedIn: boolean } }) => state.auth.isLoggedIn;
export const { setUser, setApiToken, setRefreshToken, setIsLoggedIn, logout, setSyncVersion } = authSlice.actions;