import React from "react";

import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import App from "./App";

import "./index.css";
import {
  AuthProvider
} from "./context/AuthContext";

// import {
//   AuthProvider
// } from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <AuthProvider>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,

          style: {
            background: "#0d0d0d",
            color: "#f5f5f5",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            padding: "14px 16px",
            fontSize: "14px",
          },
        }}
      />

      <App />

    </AuthProvider>

  </React.StrictMode>
);