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
    try {
      const response = await api.get("auth/profile/");

      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  const activeBookings = bookings.filter(
    (booking) => new Date(booking.session_date) > new Date(),
  );

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.session_date) <= new Date(),
  );

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white mb-10 shadow-xl">
          <p className="uppercase tracking-widest text-indigo-200 text-sm mb-3">
            Dashboard
          </p>

          <h1 className="text-4xl font-bold mb-3">
            Welcome back, {profile?.username}
          </h1>

          <p className="text-indigo-100">
            Manage your bookings and profile information.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow p-6 border">
            <p className="text-slate-500 text-sm mb-2">Username</p>

            <h3 className="text-xl font-bold">{profile?.username}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border">
            <p className="text-slate-500 text-sm mb-2">Email</p>

            <h3 className="text-lg font-semibold break-all">
              {profile?.email}
            </h3>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border">
            <p className="text-slate-500 text-sm mb-2">Role</p>

            <h3 className="text-xl font-bold text-indigo-600">
              {profile?.role}
            </h3>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold">My Bookings</h2>

          <p className="text-slate-500 mt-2">Track all your booked sessions.</p>
        </div>

        <div className="space-y-12">
          <div>
            <div className="mb-5">
              <h2 className="text-3xl font-bold">Active Bookings</h2>

              <p className="text-slate-500 mt-2">
                Upcoming sessions you booked.
              </p>
            </div>

            {activeBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border p-10 text-center shadow">
                <p className="text-slate-500">No active bookings</p>
              </div>
            ) : (
              <div className="grid gap-5">
                {activeBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border shadow p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {booking.session_title}
                        </h3>

                        <p className="text-slate-600">
                          Creator:{" "}
                          <span className="font-semibold">
                            {booking.creator_name}
                          </span>
                        </p>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3">
                        <p className="text-sm text-green-600 mb-1">
                          Session Starts
                        </p>

                        <p className="font-semibold">
                          {new Date(booking.session_date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-5">
              <h2 className="text-3xl font-bold">Past Bookings</h2>

              <p className="text-slate-500 mt-2">
                Previously attended sessions.
              </p>
            </div>

            {pastBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border p-10 text-center shadow">
                <p className="text-slate-500">No past bookings</p>
              </div>
            ) : (
              <div className="grid gap-5">
                {pastBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border shadow p-6 opacity-80"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {booking.session_title}
                        </h3>

                        <p className="text-slate-600">
                          Creator:{" "}
                          <span className="font-semibold">
                            {booking.creator_name}
                          </span>
                        </p>
                      </div>

                      <div className="bg-slate-100 border rounded-xl px-5 py-3">
                        <p className="text-sm text-slate-500 mb-1">
                          Completed On
                        </p>

                        <p className="font-semibold">
                          {new Date(booking.session_date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
