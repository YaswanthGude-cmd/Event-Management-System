import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./MyRegistrations.css";

const MyRegistrations = () => {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([
    {
      id: 1,
      title: "Tech Fest 2026",
      category: "Technical",
      date: "August 20, 2026",
      time: "10:00 AM - 4:00 PM",
      venue: "ANITS Auditorium",
      status: "Registered",
      icon: "💻",
    },
    {
      id: 2,
      title: "Hackathon 2026",
      category: "Technical",
      date: "August 25, 2026",
      time: "9:00 AM - 6:00 PM",
      venue: "Computer Science Block",
      status: "Registered",
      icon: "🚀",
    },
    {
      id: 3,
      title: "Cultural Fest",
      category: "Cultural",
      date: "September 5, 2026",
      time: "10:00 AM - 7:00 PM",
      venue: "College Open Ground",
      status: "Completed",
      icon: "🎭",
    },
    {
      id: 4,
      title: "AI & ML Workshop",
      category: "Workshop",
      date: "September 18, 2026",
      time: "10:00 AM - 2:00 PM",
      venue: "Seminar Hall",
      status: "Registered",
      icon: "🤖",
    },
  ]);

  const [filter, setFilter] = useState("All");

  const handleCancel = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmed) return;

    setRegistrations((prev) =>
      prev.map((registration) =>
        registration.id === id
          ? { ...registration, status: "Cancelled" }
          : registration
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  const filteredRegistrations = registrations.filter((registration) => {
    if (filter === "All") return true;

    return registration.status === filter;
  });

  return (
    <div className="registrations-page">

      <Navbar />

      <div className="registrations-layout">

        {/* ================= SIDEBAR ================= */}

        <aside className="registrations-sidebar">

          <h2>Dashboard</h2>

          <nav className="registrations-sidebar-nav">

            <Link to="/dashboard">
              <span>📊</span>
              <span>Overview</span>
            </Link>

            <Link
              to="/my-registrations"
              className="active"
            >
              <span>📄</span>
              <span>My Registrations</span>
            </Link>

            <Link to="/profile">
              <span>👤</span>
              <span>Profile</span>
            </Link>

          </nav>

          <button
            className="registrations-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            <span>Logout</span>
          </button>

        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <main className="registrations-content">

          {/* Header */}

          <div className="registrations-header">

            <div>
              <h1>My Registrations</h1>

              <p>
                View and manage the events you have registered for.
              </p>
            </div>

            <Link
              to="/events"
              className="browse-events-btn"
            >
              Browse Events
            </Link>

          </div>

          {/* ================= SUMMARY ================= */}

          <div className="registration-stats">

            <div className="registration-stat-card">

              <div className="registration-stat-icon blue">
                📄
              </div>

              <div>
                <span>Total Registrations</span>
                <strong>
                  {registrations.length}
                </strong>
              </div>

            </div>

            <div className="registration-stat-card">

              <div className="registration-stat-icon green">
                ✅
              </div>

              <div>
                <span>Upcoming</span>

                <strong>
                  {
                    registrations.filter(
                      (item) => item.status === "Registered"
                    ).length
                  }
                </strong>
              </div>

            </div>

            <div className="registration-stat-card">

              <div className="registration-stat-icon purple">
                🏆
              </div>

              <div>
                <span>Completed</span>

                <strong>
                  {
                    registrations.filter(
                      (item) => item.status === "Completed"
                    ).length
                  }
                </strong>
              </div>

            </div>

            <div className="registration-stat-card">

              <div className="registration-stat-icon red">
                ❌
              </div>

              <div>
                <span>Cancelled</span>

                <strong>
                  {
                    registrations.filter(
                      (item) => item.status === "Cancelled"
                    ).length
                  }
                </strong>
              </div>

            </div>

          </div>

          {/* ================= REGISTRATION SECTION ================= */}

          <section className="registrations-section">

            <div className="registrations-section-header">

              <h2>Registered Events</h2>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Registered">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

            </div>

            {/* Registration Cards */}

            {filteredRegistrations.length > 0 ? (

              <div className="registrations-list">

                {filteredRegistrations.map((registration) => (

                  <div
                    className="registration-card"
                    key={registration.id}
                  >

                    {/* Icon */}

                    <div className="registration-event-icon">
                      {registration.icon}
                    </div>

                    {/* Details */}

                    <div className="registration-details">

                      <div className="registration-title-row">

                        <h3>
                          {registration.title}
                        </h3>

                        <span
                          className={`registration-status ${registration.status.toLowerCase()}`}
                        >
                          {registration.status}
                        </span>

                      </div>

                      <span className="registration-category">
                        {registration.category}
                      </span>

                      <div className="registration-info">

                        <span>
                          📅 {registration.date}
                        </span>

                        <span>
                          ⏰ {registration.time}
                        </span>

                        <span>
                          📍 {registration.venue}
                        </span>

                      </div>

                    </div>

                    {/* Actions */}

                    <div className="registration-actions">

                      <Link
                        to="/events"
                        className="view-event-btn"
                      >
                        View
                      </Link>

                      {registration.status === "Registered" && (
                        <button
                          className="cancel-registration-btn"
                          onClick={() =>
                            handleCancel(registration.id)
                          }
                        >
                          Cancel
                        </button>
                      )}

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="no-registrations">

                <div className="no-registration-icon">
                  📄
                </div>

                <h3>No Registrations Found</h3>

                <p>
                  You haven't registered for any events yet.
                </p>

                <Link
                  to="/events"
                  className="browse-events-btn"
                >
                  Explore Events
                </Link>

              </div>

            )}

          </section>

        </main>

      </div>

    </div>
  );
};

export default MyRegistrations;