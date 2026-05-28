import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { Session } from "../types/session";
import toast from "react-hot-toast";


export default function SessionDetails() {
  const { id } = useParams();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

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
      setBookingLoading(true);

      await api.post("bookings/", {
        session: id,
      });

      toast.success("Session booked successfully");
    } catch (error) {
      console.log(error);

      toast.error("Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-500">Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Session not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-white">
            <p className="uppercase text-sm tracking-widest text-indigo-200 mb-3">
              Premium Session
            </p>

            <h1 className="text-5xl font-bold mb-4">{session.title}</h1>

            <p className="text-indigo-100 text-lg max-w-3xl">
              {session.description}
            </p>
          </div>

          <div className="p-10">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-slate-50 rounded-2xl p-6 border">
                <p className="text-slate-500 text-sm mb-2">Creator</p>

                <h3 className="text-xl font-bold">{session.creator_name}</h3>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border">
                <p className="text-slate-500 text-sm mb-2">Duration</p>

                <h3 className="text-xl font-bold">
                  {session.duration}
                  mins
                </h3>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border">
                <p className="text-slate-500 text-sm mb-2">Price</p>

                <h3 className="text-xl font-bold text-indigo-600">
                  ₹{session.price}
                </h3>
              </div>
            </div>

            <div className="bg-slate-50 border rounded-2xl p-6 mb-10">
              <p className="text-slate-500 text-sm mb-2">Session Date</p>

              <h3 className="text-lg font-semibold">
                {new Date(session.date).toLocaleString()}
              </h3>
            </div>

            <button
              onClick={bookSession}
              disabled={bookingLoading}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
