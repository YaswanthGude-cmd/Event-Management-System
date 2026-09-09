import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    setMenuOpen(false);

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar-container">

      {/* Logo */}
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <div className="logo-circle">A</div>

        <div className="logo-text">
          <h3>ANITS</h3>
          <span>Events Hub</span>
        </div>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation + Auth */}
      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>

        {/* Navigation Links */}
        <div className="navbar-links">

          <Link to="/home" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/events" onClick={closeMenu}>
            Events
          </Link>

          {isLoggedIn && (
            <>
              <Link to="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>

              <Link to="/profile" onClick={closeMenu}>
                Profile
              </Link>
            </>
          )}

        </div>

        {/* Authentication */}
        <div className="navbar-auth">

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="navbar-login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="navbar-register"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;