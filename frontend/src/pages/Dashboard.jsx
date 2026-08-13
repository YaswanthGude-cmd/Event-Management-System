import React from "react";
import { Link , useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* Top Navbar */}
      <Navbar />

      {/* Dashboard Layout */}
      <div className="dashboard-layout">

        {/* Sidebar */}
        <aside className="dashboard-sidebar">

            <h2>Dashboard</h2>

            <nav className="sidebar-nav">

                <Link
                to="/dashboard"
                className="sidebar-item active"
                >
                <span className="sidebar-icon">📊</span>
                <span>Overview</span>
                </Link>

                {/* <Link
                to="/events"
                className="sidebar-item"
                >
                <span className="sidebar-icon">🗓️</span>
                <span>Events</span>
                </Link> */}

                <Link
                to="/my-registrations"
                className="sidebar-item"
                >
                <span className="sidebar-icon">📄</span>
                <span>My Registrations</span>
                </Link>

                <Link
                to="/profile"
                className="sidebar-item"
                >
                <span className="sidebar-icon">👤</span>
                <span>Profile</span>
                </Link>

            </nav>

            <div className="sidebar-logout">

                <button
                className="sidebar-item"
                onClick={handleLogout}
                >
                <span className="sidebar-icon">↪</span>
                <span>Logout</span>
                </button>

            </div>

            </aside>

        {/* Main Dashboard Content */}
        <main className="dashboard-content">

          {/* Header */}
          <div className="dashboard-header">
            <div>
              <h1>Welcome Back! 👋</h1>
              <p>
                Here's what's happening with your events.
              </p>
            </div>

            <Link to="/events" className="browse-events-btn">
              Browse Events
            </Link>
          </div>

          {/* Statistics */}
          <div className="dashboard-stats">

            <div className="stat-card">
              <div className="stat-icon blue">
                📅
              </div>

              <div>
                <p>Total Events</p>
                <h2>50+</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                📝
              </div>

              <div>
                <p>Registered Events</p>
                <h2>8</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                🏆
              </div>

              <div>
                <p>Completed Events</p>
                <h2>5</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                ⭐
              </div>

              <div>
                <p>Achievements</p>
                <h2>3</h2>
              </div>
            </div>

          </div>

          {/* Upcoming Events */}
          <section className="dashboard-section">

            <div className="section-heading">
              <h2>Upcoming Events</h2>

              <Link to="/events">
                View All →
              </Link>
            </div>

            <div className="dashboard-event-list">

              <div className="dashboard-event-card">

                <div className="event-date-box">
                  <span>AUG</span>
                  <strong>20</strong>
                </div>

                <div className="event-details">
                  <h3>Tech Fest 2026</h3>

                  <p>
                    💻 Technical
                  </p>

                  <small>
                    📍 ANITS Auditorium
                  </small>
                </div>

                <Link
                  to="/events"
                  className="event-view-btn"
                >
                  View
                </Link>

              </div>

              <div className="dashboard-event-card">

                <div className="event-date-box">
                  <span>AUG</span>
                  <strong>25</strong>
                </div>

                <div className="event-details">
                  <h3>Hackathon 2026</h3>

                  <p>
                    🚀 Technical
                  </p>

                  <small>
                    📍 Computer Science Block
                  </small>
                </div>

                <Link
                  to="/events"
                  className="event-view-btn"
                >
                  View
                </Link>

              </div>

              <div className="dashboard-event-card">

                <div className="event-date-box">
                  <span>SEP</span>
                  <strong>05</strong>
                </div>

                <div className="event-details">
                  <h3>Cultural Fest</h3>

                  <p>
                    🎭 Cultural
                  </p>

                  <small>
                    📍 College Open Ground
                  </small>
                </div>

                <Link
                  to="/events"
                  className="event-view-btn"
                >
                  View
                </Link>

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;