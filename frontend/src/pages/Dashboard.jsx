import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        navigate("/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [eventsResponse, registrationsResponse] =
        await Promise.all([
          fetch("http://localhost:5000/api/events", {
            headers,
          }),
          fetch(
            `http://localhost:5000/api/registrations/user/${userId}`,
            {
              headers,
            }
          ),
        ]);

      const eventsData = await eventsResponse.json();
      const registrationsData =
        await registrationsResponse.json();

      if (!eventsResponse.ok) {
        throw new Error(
          eventsData.message || "Failed to fetch events"
        );
      }

      if (!registrationsResponse.ok) {
        throw new Error(
          registrationsData.message ||
            "Failed to fetch registrations"
        );
      }

      setEvents(eventsData.events || []);
      setRegistrations(
        registrationsData.registrations || []
      );
    } catch (error) {
      console.error(
        "Error fetching dashboard data:",
        error
      );

      setError(
        error.message || "Unable to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const registeredCount = registrations.filter(
    (registration) =>
      registration.status === "REGISTERED"
  ).length;

  const completedCount = registrations.filter(
    (registration) =>
      registration.eventId?.status === "COMPLETED"
  ).length;

  const upcomingEvents = events
    .filter((event) => event.status === "UPCOMING")
    .sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date)
    )
    .slice(0, 3);

  const formatMonth = (date) => {
    if (!date) return "";

    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "short",
      })
      .toUpperCase();
  };

  const formatDay = (date) => {
    if (!date) return "";

    return new Date(date).getDate();
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <Navbar />

        <div className="dashboard-loading">
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <Navbar />

        <div className="dashboard-loading">
          <h2>Unable to Load Dashboard</h2>
          <p>{error}</p>

          <button
            className="browse-events-btn"
            onClick={fetchDashboardData}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-layout">

        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">
          <h2>Dashboard</h2>

          <nav className="sidebar-nav">
            <Link
              to="/dashboard"
              className="sidebar-item active"
            >
              <span className="sidebar-icon">
                📊
              </span>
              <span>Overview</span>
            </Link>

            <Link
              to="/my-registrations"
              className="sidebar-item"
            >
              <span className="sidebar-icon">
                📄
              </span>
              <span>My Registrations</span>
            </Link>

            <Link
              to="/profile"
              className="sidebar-item"
            >
              <span className="sidebar-icon">
                👤
              </span>
              <span>Profile</span>
            </Link>
          </nav>

          <div className="sidebar-logout">
            <button
              className="sidebar-item"
              onClick={handleLogout}
            >
              <span className="sidebar-icon">
                ↪
              </span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="dashboard-content">

          {/* HEADER */}
          <div className="dashboard-header">
            <div>
              <h1>Welcome Back! 👋</h1>
              <p>
                Here's what's happening with your events.
              </p>
            </div>

            <Link
              to="/events"
              className="browse-events-btn"
            >
              Browse Events
            </Link>
          </div>

          {/* STATISTICS */}
          <div className="dashboard-stats">

            <div className="stat-card">
              <div className="stat-icon blue">
                📅
              </div>

              <div>
                <p>Total Events</p>
                <h2>{events.length}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                📝
              </div>

              <div>
                <p>Registered Events</p>
                <h2>{registeredCount}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                🏆
              </div>

              <div>
                <p>Completed Events</p>
                <h2>{completedCount}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                ⭐
              </div>

              <div>
                <p>Achievements</p>
                <h2>0</h2>
              </div>
            </div>

          </div>

          {/* UPCOMING EVENTS */}
          <section className="dashboard-section">

            <div className="section-heading">
              <h2>Upcoming Events</h2>

              <Link to="/events">
                View All →
              </Link>
            </div>

            <div className="dashboard-event-list">

              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div
                    className="dashboard-event-card"
                    key={event._id}
                  >

                    <div className="event-date-box">
                      <span>
                        {formatMonth(event.date)}
                      </span>

                      <strong>
                        {formatDay(event.date)}
                      </strong>
                    </div>

                    <div className="event-details">
                      <h3>
                        {event.title}
                      </h3>

                      <p>
                        💻 {event.category}
                      </p>

                      <small>
                        📍 {event.venue}
                      </small>
                    </div>

                    <Link
                      to={`/events/${event._id}`}
                      className="event-view-btn"
                    >
                      View
                    </Link>

                  </div>
                ))
              ) : (
                <div className="dashboard-empty">
                  <h3>No Upcoming Events</h3>

                  <p>
                    There are no upcoming events
                    available right now.
                  </p>

                  <Link
                    to="/events"
                    className="browse-events-btn"
                  >
                    Browse Events
                  </Link>
                </div>
              )}

            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;