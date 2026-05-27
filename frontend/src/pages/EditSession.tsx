import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";

export default function EditSession() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    date: "",
  });

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    const response = await api.get(`sessions/${id}/`);

    setFormData(response.data);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const updateSession = async () => {
    await api.patch(`sessions/${id}/`, formData);

    navigate("/creator");
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-5">Edit Session</h1>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <button onClick={updateSession} className="border px-5 py-2">
        Update
      </button>
    </div>
  );
}
