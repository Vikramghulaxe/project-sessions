import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { Session } from "../types/session";


export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const response = await api.get("sessions/");

    setSessions(response.data);
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-5">
            Discover Expert-Led Sessions
          </h1>

          <p className="text-lg text-indigo-100 max-w-2xl">
            Book premium learning sessions from creators around the world.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Popular Sessions</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-2xl shadow p-6 border"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{session.title}</h3>

                <p className="font-semibold text-indigo-600">
                  ₹{session.price}
                </p>
              </div>

              <p className="text-gray-600 mb-5 line-clamp-3">
                {session.description}
              </p>

              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>Creator: {session.creator_name}</p>

                <p>
                  Duration: {session.duration}
                  mins
                </p>
              </div>

              <Link
                to={`/session/${session.id}`}
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
