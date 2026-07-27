import api from "./axios";

export const login = (data) =>
    api.post("/auth/login", data);

export const register = (data) =>
    api.post("/auth/register", data);

export const verifyEmail = (data) =>
    api.post("/auth/verify-email", data);

export const refreshToken = () =>
    api.post("/auth/refresh-token");

export const resendVerification = (data) =>
    api.post("/auth/resend-verification", data);

export const forgotPassword = (data) =>
    api.post("/auth/forgot-password", data);

export const resetPassword = (data) =>
    api.post("/auth/reset-password", data);

export const logout = () =>
    api.post("/auth/logout");