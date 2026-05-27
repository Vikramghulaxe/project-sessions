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
    <nav className="flex justify-between p-5 border-b">
      <Link to="/" className="font-bold">
        Sessions Marketplace
      </Link>

      <div className="flex gap-4">
        <Link to="/">Home</Link>

        {user?.role === "USER" && <Link to="/dashboard">My Bookings</Link>}

        {user?.role === "CREATOR" && <Link to="/creator">My Sessions</Link>}

        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
