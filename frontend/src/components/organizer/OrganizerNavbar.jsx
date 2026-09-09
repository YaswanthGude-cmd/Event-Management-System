import React from "react";
import "./OrganizerNavbar.css";

const OrganizerNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="organizer-navbar">

      <div className="organizer-navbar-left">

        {/* Mobile Sidebar Button */}
        <button
          className="sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <div className="navbar-brand">
          <h2>Event Management</h2>
          <span>Organizer Panel</span>
        </div>

      </div>


      <div className="organizer-navbar-right">

        <button
          className="notification-btn"
          aria-label="Notifications"
        >
          🔔
        </button>

        <div className="organizer-user">

          <div className="user-avatar">
            O
          </div>

          <div className="user-details">
            <span className="user-name">
              Organizer
            </span>

            <span className="user-role">
              Event Organizer
            </span>
          </div>

        </div>

      </div>

    </nav>
  );
};

export default OrganizerNavbar;