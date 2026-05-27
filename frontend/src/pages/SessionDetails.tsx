import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";
import { Session } from "../types/session";

export default function SessionDetails() {
  const { id } = useParams();

  const [session, setSession] = useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const response = await api.get(`sessions/${id}/`);

      setSession(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const bookSession = async () => {
    try {
      await api.post("bookings/", {
        session: id,
      });

      alert("Session booked successfully");
    } catch {
      alert("Booking failed");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!session) {
    return <h2>Session not found</h2>;
  }

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>{session.title}</h1>

      <p>{session.description}</p>

      <p>Creator: {session.creator_name}</p>

      <p>
        Duration: {session.duration}
        mins
      </p>

      <p>Price: ₹{session.price}</p>

      <p>Date: {new Date(session.date).toLocaleString()}</p>

      <button onClick={bookSession}>Book Now</button>
    </div>
  );
}
