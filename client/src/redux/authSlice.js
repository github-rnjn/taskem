import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: true, // <-- important
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        setCredentials(state, action) {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.loading = false;
        },

        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.loading = false;
        },

        finishLoading(state) {
            state.loading = false;
        }

    },
});

export const {
    setCredentials,
    logout,
    finishLoading,
} = authSlice.actions;

export default authSlice.reducer;