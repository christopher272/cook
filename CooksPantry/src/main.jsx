import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import KitchenInventoryProvider from "./components/KitchenInventoryContext";
import "./index.css";



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <KitchenInventoryProvider>
                <App />
            </KitchenInventoryProvider>
        </Router>
    </React.StrictMode>
);
