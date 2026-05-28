import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log(clientId)

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={clientId}
    >
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);