
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OrganizerNavbar.css";

const OrganizerNavbar = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  return (
    <nav className="organizer-navbar">

      {/* Left Side */}
      <div className="organizer-navbar-left">

        {/* Mobile Sidebar Button */}
        <button
          className="sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <Link
          to="/organizer"
          className="navbar-brand"
        >
          <h2>Event Management</h2>
          <span>
            {userRole === "ADMIN"
              ? "Admin - Organizer Panel"
              : "Organizer Panel"}
          </span>
        </Link>

      </div>


      {/* Right Side */}
      <div className="organizer-navbar-right">

        {userRole === "ADMIN" && (
          <Link
            to="/admin"
            className="user-module-btn">Admin Module</Link>
        )}

        {/* User Module */}
        <Link
          to="/home"
          className="user-module-btn"
        >
          User Module
        </Link>


        {/* Notifications */}
        <button
          className="notification-btn"
          aria-label="Notifications"
        >
          🔔
        </button>


        {/* User Details */}
        <div className="organizer-user">

          <div className="user-avatar">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="user-details">

            <span className="user-name">
              {userName || "User"}
            </span>

            <span className="user-role">
              {userRole === "ADMIN"
                ? "Administrator"
                : "Event Organizer"}
            </span>

          </div>

        </div>


        {/* Logout */}
        <button
          className="organizer-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default OrganizerNavbar;

