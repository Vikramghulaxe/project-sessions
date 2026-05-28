import { useEffect, useState } from "react";
import api from "../api/axios";


export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("auth/profile/");

      setProfile(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-white">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
                {profile?.username?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <p className="uppercase tracking-widest text-indigo-200 text-sm mb-2">
                  Profile
                </p>

                <h1 className="text-4xl font-bold mb-2">{profile?.username}</h1>

                <p className="text-indigo-100">
                  Manage your account information
                </p>
              </div>
            </div>
          </div>

          <div className="p-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 border rounded-2xl p-6">
                <p className="text-sm text-slate-500 mb-2">Username</p>

                <h3 className="text-2xl font-bold">{profile?.username}</h3>
              </div>

              <div className="bg-slate-50 border rounded-2xl p-6">
                <p className="text-sm text-slate-500 mb-2">Email</p>

                <h3 className="text-xl font-semibold break-all">
                  {profile?.email}
                </h3>
              </div>

              <div className="bg-slate-50 border rounded-2xl p-6">
                <p className="text-sm text-slate-500 mb-2">Role</p>

                <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
                  {profile?.role}
                </span>
              </div>

              <div className="bg-slate-50 border rounded-2xl p-6">
                <p className="text-sm text-slate-500 mb-2">Account Status</p>

                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
