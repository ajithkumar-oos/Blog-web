import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">PERSONAL-BLOG</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto gap-2 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create</Link>
              </li>
            )}

            {user?.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/posts">Admin Posts</Link>
                </li>
              </>
            )}

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item text-white small">Hi, {user.name}</li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      logout();
                      nav("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
