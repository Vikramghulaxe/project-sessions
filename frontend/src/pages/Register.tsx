import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const register = async () => {
    if (!formData.username.trim()) {
      toast.error("Username is required");

      return;
    }

    if (formData.username.length < 3) {
      toast.error("Username must be at least 3 characters");

      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email");

      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");

      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      toast.error("Password must contain at least one uppercase letter");

      return;
    }

    if (!/[0-9]/.test(formData.password)) {
      toast.error("Password must contain at least one number");

      return;
    }

    try {
      setLoading(true);

      await api.post("auth/register/", {
        ...formData,
        username: formData.username.trim(),
        email: formData.email.trim(),
      });

      toast.success("Registration successful");

      navigate("/login");
    } catch (error: any) {
      console.log(error);

      if (error?.response?.data?.username) {
        toast.error(error.response.data.username[0]);
      } else if (error?.response?.data?.email) {
        toast.error(error.response.data.email[0]);
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>

          <p className="text-slate-500 mt-2">Join Ocean Sessions</p>
        </div>

        <div className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            minLength={3}
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          />

          <input
            name="password"
            type="password"
            minLength={6}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="USER">User</option>

            <option value="CREATOR">Creator</option>
          </select>

          <button
            onClick={register}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>

        <p className="text-center text-slate-500 mt-8">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold ml-2"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
