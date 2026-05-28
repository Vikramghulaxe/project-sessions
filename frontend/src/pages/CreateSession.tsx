import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function CreateSession() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    if (!formData.title.trim()) {
      toast.error("Session title is required");

      return;
    }

    if (formData.title.length < 5) {
      toast.error("Title should be at least 5 characters");

      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");

      return;
    }

    if (formData.description.length < 20) {
      toast.error("Description should be at least 20 characters");

      return;
    }

    if (Number(formData.price) <= 0) {
      toast.error("Price must be greater than 0");

      return;
    }

    if (Number(formData.duration) <= 0) {
      toast.error("Duration must be greater than 0");

      return;
    }

    if (!formData.date) {
      toast.error("Session start time is required");

      return;
    }

    const selectedDate = new Date(formData.date);

    if (selectedDate < new Date()) {
      toast.error("Session date must be in the future");

      return;
    }

    try {
      setLoading(true);

      await api.post("sessions/", formData);

      toast.success("Session created successfully");

      navigate("/creator");
    } catch (error) {
      console.log(error);

      toast.error("Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-white">
            <p className="uppercase tracking-widest text-indigo-200 text-sm mb-3">
              Creator Portal
            </p>

            <h1 className="text-4xl font-bold mb-4">Create New Session</h1>

            <p className="text-indigo-100 text-lg">
              Launch your next premium learning experience.
            </p>
          </div>

          <div className="p-10 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Session Title
              </label>

              <input
                name="title"
                placeholder="e.g. React Masterclass"
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe your session..."
                rows={5}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Price (₹)
                </label>

                <input
                  type="number"
                  min="1"
                  name="price"
                  placeholder="499"
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Duration (mins)
                </label>

                <input
                  type="number"
                  min="1"
                  name="duration"
                  placeholder="60"
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Session Start Time
              </label>

              <input
                type="datetime-local"
                name="date"
                min={new Date().toISOString().slice(0, 16)}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={createSession}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition"
            >
              {loading ? "Creating Session..." : "Create Session"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
