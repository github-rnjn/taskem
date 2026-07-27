import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { refreshToken } from "../api/auth";

import {
    setCredentials,
    logout,
    finishLoading,
} from "../redux/authSlice";

export default function AuthProvider({ children }) {

    const dispatch = useDispatch();

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {

        async function initialize() {

            try {

                const response = await refreshToken();

                dispatch(
                    setCredentials(response.data.data)
                );

            }
            catch (error) {

                if (error.response?.status === 401) {
                    dispatch(logout());
                } else {
                    console.error(error);
                    dispatch(finishLoading());
                }

            }
            finally {

                setInitialized(true);

            }

        }

        initialize();

    }, [dispatch]);

    if (!initialized) {
        return <div>Loading...</div>;
    }

    return children;

}