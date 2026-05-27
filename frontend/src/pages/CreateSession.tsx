import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

export default function CreateSession() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const createSession = async () => {
    try {
      await api.post("sessions/", formData);

      navigate("/creator");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-5">Create Session</h1>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="price"
        placeholder="Price"
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="duration"
        placeholder="Duration"
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="datetime-local"
        name="date"
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <button onClick={createSession} className="border px-5 py-2">
        Create
      </button>
    </div>
  );
}
