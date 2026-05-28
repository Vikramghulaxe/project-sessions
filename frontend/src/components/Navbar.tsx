import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Ocean Sessions
        </Link>

        <div className="flex items-center gap-5">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>

          {user?.role === "USER" && (
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600"
            >
              My Bookings
            </Link>
          )}

          {user?.role === "CREATOR" && (
            <Link to="/creator" className="text-gray-700 hover:text-indigo-600">
              My Sessions
            </Link>
          )}

          <Link to="/profile" className="text-gray-700 hover:text-indigo-600">
            Profile
          </Link>

          {user ? (
            <button
              onClick={logout}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <div className="flex item-center gap-3">
              <Link to="/login" className="text-indigo-600 pt-[8px]">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
