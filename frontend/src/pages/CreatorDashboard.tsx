import { useEffect, useState } from "react";
import api from "../api/axios";
import { Session } from "../types/session";
import { useNavigate } from "react-router-dom";

export default function CreatorDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const navigate = useNavigate();

  const fetchSessions = async () => {
    const response = await api.get("sessions/mine/");

    setSessions(response.data);
  };

  const deleteSession = async (id: number) => {
    try {
      await api.delete(`sessions/${id}/`);

      fetchSessions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">My Sessions</h1>

        <button
          onClick={() => (window.location.href = "/create-session")}
          className="border px-4 py-2 rounded"
        >
          Create Session
        </button>
      </div>

      <div className="grid gap-4">
        {sessions.map((session) => (
          <div key={session.id} className="border rounded-lg p-5 shadow">
            <h2 className="font-bold text-xl">{session.title}</h2>

            <p>₹{session.price}</p>

            <p>
              Duration: {session.duration}
              mins
            </p>

            <div className="flex gap-3 mt-4">
              <button onClick={() => navigate(`/edit-session/${session.id}`)}>
                Edit
              </button>

              <button
                className="border px-3 py-1 rounded"
                onClick={() => deleteSession(session.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
