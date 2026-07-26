import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        setCredentials(state, action) {

            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;

        },

        updateAccessToken(state, action) {

            state.accessToken = action.payload;

        },

        logout(state) {

            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;

        },

        setLoading(state, action) {

            state.isLoading = action.payload;

        }

    }

});

export const {

    setCredentials,

    updateAccessToken,

    logout,

    setLoading

} = authSlice.actions;

export default authSlice.reducer;