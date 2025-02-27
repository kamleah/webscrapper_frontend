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


};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.refreshToken = action.payload.refreshToken;
            state.accessToken = action.payload.accessToken;
            state.isManualLogin = action.payload.isManualLogin;
            state.isLogged = action.payload.isLogged;
        },
        logout(state, action) {
            state.isLogged = false;
            state.refreshToken = undefined;
            state.accessToken = undefined;
            state.isManualLogin = true;
            state.status = null;
            state.error = null;
        },

        setLoggedUser: (state, action) => {
            state.isLogged = action.payload
            console.log(action.payload,"actioj payloe")
        },
        
        setLoggedUserDetails: (state, action) => {
            state.loggedUserDetails = action.payload
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(adminLogin.pending, (state) => {
    //             state.status = "loading";
    //             state.error = null;
    //         })
    //         .addCase(adminLogin.fulfilled, (state, action) => {
    //             state.status = "succeeded";
    //             state.refreshToken = action.payload.refresh;
    //             state.accessToken = action.payload.access;
    //             state.isManualLogin = true;
    //             state.isLogged = true;
    //         })
    //         .addCase(adminLogin.rejected, (state, action) => {
    //             state.status = "failed";
    //             state.error = action.error.message;
    //         });
    // }
});

export const { setToken, logout,setLoggedUser, setLoggedUserDetails } = authSlice.actions
export default authSlice.reducer