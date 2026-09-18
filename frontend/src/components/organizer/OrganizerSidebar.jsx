import React from "react";
import { NavLink } from "react-router-dom";
import "./OrganizerSidebar.css";

const OrganizerSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`organizer-sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >

        {/* Sidebar Header */}
        <div className="sidebar-header">

          <div className="sidebar-title">
            Organizer Panel
          </div>

          {/* Mobile Close Button */}
          <button
            className="sidebar-close-btn"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            ×
          </button>

        </div>


        {/* Navigation */}
        <nav className="sidebar-menu">

          <NavLink
            to="/organizer/dashboard"
            onClick={() => {
              if (window.innerWidth <= 768) {
                toggleSidebar();
              }
            }}
          >
            <span className="sidebar-icon">📊</span>
            <span>Dashboard</span>
          </NavLink>


          <NavLink
            to="/organizer/create-event"
            onClick={() => {
              if (window.innerWidth <= 768) {
                toggleSidebar();
              }
            }}
          >
            <span className="sidebar-icon">➕</span>
            <span>Create Event</span>
          </NavLink>


          <NavLink
            to="/organizer/my-events"
            onClick={() => {
              if (window.innerWidth <= 768) {
                toggleSidebar();
              }
            }}
          >
            <span className="sidebar-icon">📅</span>
            <span>My Events</span>
          </NavLink>


          <NavLink
            to="/organizer/participants"
            onClick={() => {
              if (window.innerWidth <= 768) {
                toggleSidebar();
              }
            }}
          >
            <span className="sidebar-icon">👥</span>
            <span>Participants</span>
          </NavLink>


          <NavLink
            to="/organizer/registrations"
            onClick={() => {
              if (window.innerWidth <= 768) {
                toggleSidebar();
              }
            }}
          >
            <span className="sidebar-icon">📝</span>
            <span>Registrations</span>
          </NavLink>


          <NavLink
            to="/organizer/profile"
            onClick={() => {
              if (window.innerWidth <= 768) {
                toggleSidebar();
              }
            }}
          >
            <span className="sidebar-icon">👤</span>
            <span>Profile</span>
          </NavLink>

        </nav>

      </aside>
    </>
  );
};

export default OrganizerSidebar;