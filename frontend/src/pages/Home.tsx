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
      <h1>Sessions</h1>

      {sessions.map((session) => (
        <div key={session.id}>
          <h2>{session.title}</h2>

          <p>₹{session.price}</p>

          <Link to={`/session/${session.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}
