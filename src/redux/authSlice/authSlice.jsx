import { createSlice } from '@reduxjs/toolkit'
// import { adminLogin } from '../thunk/AuthThunk';

const initialState = {
    refreshToken: undefined,
    accessToken: undefined,
    isManualLogin: true,
    isLogged: false,
    status: null,
    error: null,
    loggedUserDetails: undefined,
    role: undefined
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.refreshToken = action.payload.refresh;
            state.accessToken = action.payload.access;
            state.isManualLogin = action.payload.isManualLogin;
            state.isLogged = action.payload.isLogged;
        },
        setRole(state, action) {
            state.role = action.payload.role
        },
        logout(state, action) {
            state.isLogged = false;
            state.refreshToken = undefined;
            state.accessToken = undefined;
            state.isManualLogin = false;
            state.status = null;
            state.error = null;
        },

        setLoggedUser: (state, action) => {
            state.isLogged = action.payload
        },

        setLoggedUserDetails: (state, action) => {
            state.loggedUserDetails = action.payload
        },
    }
});

export const { setToken, setRole, logout, setLoggedUser, setLoggedUserDetails } = authSlice.actions
export default authSlice.reducer