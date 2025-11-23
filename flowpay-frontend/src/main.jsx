import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { WalletProvider } from "./context/WalletContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </WalletProvider>
  </React.StrictMode>
);
