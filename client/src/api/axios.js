import axios from "axios";

import { store } from "../redux/store";
import {
    setCredentials,
    logout,
} from "../redux/authSlice";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
});

api.interceptors.request.use((config) => {

    const token = store.getState().auth.accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {

    failedQueue.forEach(({ resolve, reject }) => {

        if (error) {
            reject(error);
        } else {
            resolve(token);
        }

    });

    failedQueue = [];

}

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh-token")
        ) {

            if (isRefreshing) {

                return new Promise((resolve, reject) => {

                    failedQueue.push({
                        resolve,
                        reject,
                    });

                }).then((token) => {

                    originalRequest.headers.Authorization =
                        `Bearer ${token}`;

                    return api(originalRequest);

                });

            }

            originalRequest._retry = true;

            isRefreshing = true;

            try {

                const response = await api.post(
                    "/auth/refresh-token"
                );

                const {
                    accessToken,
                    user,
                } = response.data.data;

                store.dispatch(
                    setCredentials({
                        accessToken,
                        user,
                    })
                );

                processQueue(null, accessToken);

                originalRequest.headers.Authorization =
                    `Bearer ${accessToken}`;

                return api(originalRequest);

            }
            catch (refreshError) {

                processQueue(refreshError);

                store.dispatch(logout());

                window.location.href = "/login";

                return Promise.reject(refreshError);

            }
            finally {

                isRefreshing = false;

            }

        }

        return Promise.reject(error);

    }

);

export default api;