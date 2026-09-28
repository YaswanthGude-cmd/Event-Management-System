import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./MyRegistrations.css";

const MyRegistrations = () => {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH REGISTRATIONS =================

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/registrations/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch registrations");
        return;
      }

      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);

      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // ================= CANCEL REGISTRATION =================

  const handleCancel = async (registrationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this registration?",
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/registrations/${registrationId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to cancel registration");
        return;
      }

      // Update registration in UI
      setRegistrations((prev) =>
        prev.map((registration) =>
          registration._id === registrationId
            ? {
                ...registration,
                status: "CANCELLED",
              }
            : registration,
        ),
      );
    } catch (error) {
      console.error("Error cancelling registration:", error);

      alert("Unable to connect to server");
    }
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    navigate("/login");
  };

  // ================= FILTER =================

  const filteredRegistrations = registrations.filter((registration) => {
    if (filter === "All") {
      return true;
    }

    if (filter === "Upcoming") {
      return registration.status === "REGISTERED";
    }

    if (filter === "Completed") {
      return registration.eventId?.status === "COMPLETED";
    }

    if (filter === "Cancelled") {
      return registration.status === "CANCELLED";
    }

    return true;
  });

  // ================= COUNTS =================

  const totalRegistrations = registrations.length;

  const upcomingCount = registrations.filter(
    (registration) => registration.status === "REGISTERED",
  ).length;

  const completedCount = registrations.filter(
    (registration) => registration.eventId?.status === "COMPLETED",
  ).length;

  const cancelledCount = registrations.filter(
    (registration) => registration.status === "CANCELLED",
  ).length;

  // ================= DATE FORMAT =================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // ================= RENDER =================

  return (
    <div className="registrations-page">
      {/* NAVBAR */}
      <Navbar />

      <div className="registrations-layout">
        {/* SIDEBAR */}{" "}
        <aside className="registrations-sidebar">
          {" "}
          <h2>Dashboard</h2>{" "}
          <nav className="registrations-sidebar-nav">
            {" "}
            <Link to="/dashboard" className="registrations-sidebar-item">
              {" "}
              <span className="registrations-sidebar-icon"> 📊 </span>{" "}
              <span> Overview </span>{" "}
            </Link>{" "}
            <Link
              to="/my-registrations"
              className="registrations-sidebar-item active"
            >
              {" "}
              <span className="registrations-sidebar-icon"> 📄 </span>{" "}
              <span> My Registrations </span>{" "}
            </Link>{" "}
            <Link to="/profile" className="registrations-sidebar-item">
              {" "}
              <span className="registrations-sidebar-icon"> 👤 </span>{" "}
              <span> Profile </span>{" "}
            </Link>{" "}
          </nav>{" "}
          <div className="registrations-sidebar-logout">
            {" "}
            <button
              className="registrations-sidebar-item"
              onClick={handleLogout}
            >
              {" "}
              <span className="registrations-sidebar-icon"> ↪ </span>{" "}
              <span> Logout </span>{" "}
            </button>{" "}
          </div>{" "}
        </aside>
        {/* MAIN CONTENT */}
        <main className="registrations-content">
          {/* HEADER */}
          <div className="registrations-header">
            <div>
              <h1>My Registrations</h1>

              <p>View and manage the events you have registered for.</p>
            </div>

            <Link to="/events" className="browse-events-btn">
              Browse Events
            </Link>
          </div>

          {/* SUMMARY */}
          <div className="registration-stats">
            <div className="registration-stat-card">
              <div className="registration-stat-icon blue">📄</div>

              <div>
                <span>Total Registrations</span>

                <strong>{totalRegistrations}</strong>
              </div>
            </div>

            <div className="registration-stat-card">
              <div className="registration-stat-icon green">✅</div>

              <div>
                <span>Upcoming</span>

                <strong>{upcomingCount}</strong>
              </div>
            </div>

            <div className="registration-stat-card">
              <div className="registration-stat-icon purple">🏆</div>

              <div>
                <span>Completed</span>

                <strong>{completedCount}</strong>
              </div>
            </div>

            <div className="registration-stat-card">
              <div className="registration-stat-icon red">❌</div>

              <div>
                <span>Cancelled</span>

                <strong>{cancelledCount}</strong>
              </div>
            </div>
          </div>

          {/* REGISTRATION SECTION */}
          <section className="registrations-section">
            <div className="registrations-section-header">
              <h2>Registered Events</h2>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>

                <option value="Upcoming">Upcoming</option>

                <option value="Completed">Completed</option>

                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="no-registrations">
                <h3>Loading registrations...</h3>
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="no-registrations">
                <h3>Unable to Load Registrations</h3>

                <p>{error}</p>

                <button
                  className="browse-events-btn"
                  onClick={fetchRegistrations}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* REGISTRATIONS */}
            {!loading && !error && filteredRegistrations.length > 0 && (
              <div className="registrations-list">
                {filteredRegistrations.map((registration) => {
                  const event = registration.eventId;

                  return (
                    <div className="registration-card" key={registration._id}>
                      {/* ICON */}
                      <div className="registration-event-icon">📅</div>

                      {/* DETAILS */}
                      <div className="registration-details">
                        <div className="registration-title-row">
                          <h3>{event?.title || "Event"}</h3>

                          <span
                            className={`registration-status ${registration.status.toLowerCase()}`}
                          >
                            {registration.status === "REGISTERED"
                              ? "Registered"
                              : "Cancelled"}
                          </span>
                        </div>

                        <span className="registration-category">
                          {event?.category || "N/A"}
                        </span>

                        <div className="registration-info">
                          <span>📅 {formatDate(event?.date)}</span>

                          <span>⏰ {event?.time || "N/A"}</span>

                          <span>📍 {event?.venue || "N/A"}</span>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="registration-actions">
                        <button
                          type="button"
                          className="view-event-btn"
                          onClick={() => navigate(`/events/${event?._id}`)}
                        >
                          View
                        </button>

                        {registration.status === "REGISTERED" &&
                          event?.status !== "COMPLETED" && (
                            <button
                              type="button"
                              className="cancel-registration-btn"
                              onClick={() => handleCancel(registration._id)}
                            >
                              Cancel
                            </button>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* EMPTY */}
            {!loading && !error && filteredRegistrations.length === 0 && (
              <div className="no-registrations">
                <div className="no-registration-icon">📄</div>

                <h3>No Registrations Found</h3>

                <p>You haven't registered for any events yet.</p>

                <Link to="/events" className="browse-events-btn">
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
