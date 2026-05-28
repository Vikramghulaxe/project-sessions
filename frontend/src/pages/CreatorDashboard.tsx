import { useEffect, useState } from "react";
import api from "../api/axios";
import { Session } from "../types/session";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function CreatorDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await api.get("sessions/mine/");

      setSessions(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (id: number) => {
    try {
      await api.delete(`sessions/${id}/`);

      toast.success("Session deleted");

      fetchSessions();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-500">Loading sessions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white mb-10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="uppercase tracking-widest text-indigo-200 text-sm mb-3">
                Creator Dashboard
              </p>

              <h1 className="text-4xl font-bold mb-3">Manage Your Sessions</h1>

              <p className="text-indigo-100">
                Create, edit and manage your premium learning sessions.
              </p>
            </div>

            <button
              onClick={() => navigate("/create-session")}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
            >
              Create Session
            </button>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center shadow">
            <h2 className="text-2xl font-bold mb-3">No sessions yet</h2>

            <p className="text-slate-500">
              Create your first session to start receiving bookings.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-2xl border shadow p-6"
              >
                <div className="flex justify-between items-start mb-5">
                  <h2 className="text-2xl font-bold">{session.title}</h2>

                  <p className="text-indigo-600 font-bold text-lg">
                    ₹{session.price}
                  </p>
                </div>

                <p className="text-slate-600 mb-6 line-clamp-3">
                  {session.description}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                  <p>
                    Duration: {session.duration}
                    mins
                  </p>

                  <p>{new Date(session.date).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/edit-session/${session.id}`)}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteSession(session.id)}
                    className="flex-1 border border-red-300 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
