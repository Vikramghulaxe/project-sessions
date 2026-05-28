import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";


export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: null as File | null,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("auth/profile/");

      setProfile(response.data);

      setFormData({
        username: response.data.username,

        email: response.data.email,

        avatar: null,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!formData.username.trim()) {
      toast.error("Username is required");

      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter valid email");

      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append("username", formData.username);

      data.append("email", formData.email);

      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }

      await api.patch("auth/profile/update/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully");

      fetchProfile();
    } catch (error) {
      console.log(error);

      toast.error("Profile update failed");
    } finally {
      setSaving(false);
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
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {profile?.avatar ? (
                <img
                  src={`${profile.avatar}`}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-5xl font-bold border-4 border-white">
                  {profile?.username?.charAt(0)?.toUpperCase()}
                </div>
              )}

              <div>
                <p className="uppercase tracking-widest text-indigo-200 text-sm mb-2">
                  Profile
                </p>

                <h1 className="text-4xl font-bold mb-2">{profile?.username}</h1>

                <p className="text-indigo-100 text-lg">
                  Manage your account information
                </p>
              </div>
            </div>
          </div>

          <div className="p-10">
            <div className="grid md:grid-cols-2 gap-6 mb-10">
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

            <div className="border-t pt-10">
              <h2 className="text-3xl font-bold mb-8">Edit Profile</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Username
                  </label>

                  <input
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>

                  <input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Profile Avatar
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        avatar: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-5 py-4 bg-white"
                  />
                </div>

                <button
                  onClick={updateProfile}
                  disabled={saving}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition"
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
