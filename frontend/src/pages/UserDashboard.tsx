import { useEffect, useState } from "react";

import api from "../api/axios";
import { Booking } from "../types/booking";

export default function UserDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("bookings/my/");

      setBookings(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    const response = await api.get("auth/profile/");

    setProfile(response.data);
  };

  if (loading) {
    return <div className="p-10">Loading bookings...</div>;
  }

  return (
    <>
      <div className="border rounded-lg p-5 mb-6">
        <h2 className="text-xl font-bold">Profile</h2>

        <p>Username: {profile?.username}</p>

        <p>Email: {profile?.email}</p>

        <p>Role: {profile?.role}</p>
      </div>
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="border rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold">No bookings yet</h2>

            <p className="text-gray-500 mt-2">
              Browse sessions and book your first one.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-5 shadow">
                <h2 className="text-xl font-semibold">
                  {booking.session_title}
                </h2>

                <p className="text-gray-600 mt-2">
                  Creator: {booking.creator_name}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Booked on: {new Date(booking.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
