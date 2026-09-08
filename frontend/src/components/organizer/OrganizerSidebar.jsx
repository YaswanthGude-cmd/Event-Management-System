import React from "react";
import { NavLink } from "react-router-dom";
import "./OrganizerSidebar.css";

const OrganizerSidebar = () => {
  return (
    <aside className="organizer-sidebar">

      <div className="sidebar-title">
        Organizer Panel
      </div>

      <nav className="sidebar-menu">

        <NavLink to="/organizer/dashboard">
          📊 Dashboard
        </NavLink>

        <NavLink to="/organizer/create-event">
          ➕ Create Event
        </NavLink>

        <NavLink to="/organizer/my-events">
          📅 My Events
        </NavLink>

        <NavLink to="/organizer/participants">
          👥 Participants
        </NavLink>

        <NavLink to="/organizer/registrations">
          📝 Registrations
        </NavLink>

        <NavLink to="/organizer/profile">
          👤 Profile
        </NavLink>

      </nav>

    </aside>
  );
};

export default OrganizerSidebar;