import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../components/Loader";

export default function ProtectedRoute({ children }) {

    const {
        loading,
        isAuthenticated,
    } = useSelector(
        (state) => state.auth
    );

    if (loading) {

        return (
            <Loader
                fullScreen
                text="Checking authentication..."
            />
        );

    }

    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    return children;

}