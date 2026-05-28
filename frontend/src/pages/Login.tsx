import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const login = async () => {
    try {
      // Login API
      const response = await api.post("auth/login/", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access);

      // Fetch profile
      const profileResponse = await api.get("auth/profile/");

      const user = profileResponse.data;

      setUser(user);

      // Redirect by role
      if (user.role === "CREATOR") {
        navigate("/creator");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <GoogleLogin
      onSuccess={async (
        credentialResponse
      ) => {

        try {

          const response =
            await api.post(
              "auth/google/",
              {
                token:
                  credentialResponse.credential
              }
            );

          localStorage.setItem(
            "token",
            response.data.access
          );

          window.location.href = "/";

        } catch (error) {

          console.log(error);

          alert(
            "Google login failed"
          );

        }

      }}
    />

      <p>
        Don't have an account?
        <button onClick={() => navigate("/register")}>Register</button>
      </p>
    </div>
  );
}
