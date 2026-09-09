import React from "react";
import "./OrganizerNavbar.css";

const OrganizerNavbar = () => {
  return (
    <nav className="organizer-navbar">
      <div className="organizer-navbar-left">
        <h2>Event Management</h2>
      </div>

      <div className="organizer-navbar-right">
        <span className="notification">🔔</span>

        <div className="organizer-user">
          <div className="user-avatar">O</div>
          <span>Organizer</span>
        </div>
      </div>
    </nav>
  );
};

export default OrganizerNavbar;