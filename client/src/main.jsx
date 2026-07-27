import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { Toaster } from "@/components/ui/sonner";

import { store } from "./redux/store";

import "./index.css";

import App from "./App";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <Provider store={store}>

            <App />

            <Toaster
                richColors
                position="top-right"
            />

        </Provider>

    </React.StrictMode>

);