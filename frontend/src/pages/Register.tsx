import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

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
    try {
      await api.post("auth/register/", formData);

      alert("Registration successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="USER">User</option>

        <option value="CREATOR">Creator</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}
