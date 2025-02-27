import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    logged_user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedUser(state, action) {
            state.logged_user = action.payload;
        },
    },
})

export const { setLoggedUser } = userSlice.actions
export default userSlice.reducer