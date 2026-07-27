import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { Toaster } from "@/components/ui/sonner";

import { store } from "./redux/store";

import AuthProvider from "./components/AuthProvider";

import "./index.css";

import App from "./App";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>

            <Toaster
                richColors
                position="top-right"
            />

        </Provider>

    </React.StrictMode>

);