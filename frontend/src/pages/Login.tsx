import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const login = async () => {
    try {
      setLoading(true);

      const response = await api.post("auth/login/", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access);

      const profileResponse = await api.get("auth/profile/");

      const user = profileResponse.data;

      setUser(user);

      toast.success("Login successful");

      if (user.role === "CREATOR") {
        navigate("/creator");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>

          <p className="text-slate-500 mt-2">Login to continue</p>
        </div>

        <div className="space-y-4">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-slate-300 flex-1" />

          <p className="text-sm text-slate-400">OR</p>

          <div className="h-px bg-slate-300 flex-1" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const response = await api.post("auth/google/", {
                  token: credentialResponse.credential,
                });

                localStorage.setItem("token", response.data.access);

                toast.success("Google login successful");

                window.location.href = "/";
              } catch (error) {
                console.log(error);

                toast.error("Google login failed");
              }
            }}
          />
        </div>

        <p className="text-center text-slate-500 mt-8">
          Don't have an account?
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-semibold ml-2"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
