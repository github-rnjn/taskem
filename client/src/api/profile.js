import api from "./axios";

export const getProfile = () =>
    api.get("/profile");

export const updateProfile = (data) =>
    api.patch("/profile", data);

export const changePassword = (data) =>
    api.patch("/profile/change-password", data);

export const logout = () =>
    api.post("/auth/logout");