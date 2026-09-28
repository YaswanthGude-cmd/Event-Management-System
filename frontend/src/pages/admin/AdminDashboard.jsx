import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        statsResponse,
        eventsResponse,
        registrationsResponse,
      ] = await Promise.all([
        fetch(
          "http://localhost:5000/api/dashboard/stats",
          { headers }
        ),

        fetch(
          "http://localhost:5000/api/dashboard/recent-events",
          { headers }
        ),

        fetch(
          "http://localhost:5000/api/dashboard/recent-registrations",
          { headers }
        ),
      ]);

      const statsData = await statsResponse.json();
      const eventsData = await eventsResponse.json();
      const registrationsData =
        await registrationsResponse.json();

      if (!statsResponse.ok) {
        throw new Error(
          statsData.message || "Failed to fetch dashboard stats"
        );
      }

      if (!eventsResponse.ok) {
        throw new Error(
          eventsData.message || "Failed to fetch recent events"
        );
      }

      if (!registrationsResponse.ok) {
        throw new Error(
          registrationsData.message ||
            "Failed to fetch recent registrations"
        );
      }

      setStats(statsData);
      setRecentEvents(eventsData.events || []);
      setRecentRegistrations(
        registrationsData.registrations || []
      );
    } catch (error) {
      console.error(
        "Error fetching admin dashboard:",
        error
      );

      setError(
        error.message ||
          "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getEventStatus = (status) => {
    if (status === "UPCOMING") return "Upcoming";
    if (status === "ONGOING") return "Ongoing";
    if (status === "COMPLETED") return "Completed";
    if (status === "CANCELLED") return "Cancelled";

    return status || "Unknown";
  };

  const getRegistrationStatus = (status) => {
    if (status === "REGISTERED") return "Confirmed";
    if (status === "CANCELLED") return "Cancelled";

    return status || "Unknown";
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-page-header">
          <div>
            <h1>Dashboard</h1>
            <p>
              Overview of your event management system.
            </p>
          </div>
        </div>

        <div className="admin-dashboard-message">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="admin-page-header">
          <div>
            <h1>Dashboard</h1>
            <p>
              Overview of your event management system.
            </p>
          </div>
        </div>

        <div className="admin-dashboard-message error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* Header */}

      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Overview of your event management system.
          </p>
        </div>
      </div>


      {/* Statistics */}

      <div className="admin-stats-grid">

        <div className="admin-stat-card">
          <p>Total Users</p>
          <h2>{stats?.users?.total || 0}</h2>
          <span>Registered users</span>
        </div>


        <div className="admin-stat-card">
          <p>Organizers</p>
          <h2>{stats?.users?.organizers || 0}</h2>
          <span>Organizer accounts</span>
        </div>


        <div className="admin-stat-card">
          <p>Total Events</p>
          <h2>{stats?.events?.total || 0}</h2>
          <span>Created events</span>
        </div>


        <div className="admin-stat-card">
          <p>Registrations</p>
          <h2>
            {stats?.registrations?.total || 0}
          </h2>
          <span>Total registrations</span>
        </div>

      </div>


      {/* Dashboard Grid */}

      <div className="admin-dashboard-grid">

        {/* Recent Events */}

        <div className="admin-dashboard-card">

          <div className="admin-card-header">

            <div>
              <h3>Recent Events</h3>

              <p>
                Latest events created in the system.
              </p>
            </div>

            <Link to="/admin/events">
              View All
            </Link>

          </div>


          <div className="admin-table-container">

            {recentEvents.length === 0 ? (
              <div className="admin-dashboard-message">
                No events available.
              </div>
            ) : (
              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Organizer</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {recentEvents.map((event) => (
                    <tr key={event._id}>

                      <td>
                        {event.title}
                      </td>

                      <td>
                        {event.organizerId
                          ? `${event.organizerId.firstName || ""} ${
                              event.organizerId.lastName || ""
                            }`.trim()
                          : "N/A"}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            event.status === "CANCELLED"
                              ? "pending"
                              : "active"
                          }`}
                        >
                          {getEventStatus(
                            event.status
                          )}
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>
            )}

          </div>

        </div>


        {/* Quick Actions */}

        <div className="admin-dashboard-card">

          <div className="admin-card-header">

            <div>
              <h3>Quick Actions</h3>

              <p>
                Frequently used actions.
              </p>
            </div>

          </div>


          <div className="admin-quick-actions">

            <Link
              to="/admin/users"
              className="admin-action-item"
            >
              <div>
                <strong>Manage Users</strong>
                <span>
                  View and manage users
                </span>
              </div>

              <b>→</b>
            </Link>


            <Link
              to="/admin/organizers"
              className="admin-action-item"
            >
              <div>
                <strong>
                  Manage Organizers
                </strong>
                <span>
                  Manage organizer accounts
                </span>
              </div>

              <b>→</b>
            </Link>


            <Link
              to="/admin/events"
              className="admin-action-item"
            >
              <div>
                <strong>Manage Events</strong>
                <span>
                  Review and manage events
                </span>
              </div>

              <b>→</b>
            </Link>


            <Link
              to="/admin/registrations"
              className="admin-action-item"
            >
              <div>
                <strong>Registrations</strong>
                <span>
                  View event registrations
                </span>
              </div>

              <b>→</b>
            </Link>

          </div>

        </div>

      </div>


      {/* Recent Registrations */}

      <div className="admin-dashboard-card">

        <div className="admin-card-header">

          <div>
            <h3>Recent Registrations</h3>

            <p>
              Latest event registrations.
            </p>
          </div>

          <Link to="/admin/registrations">
            View All
          </Link>

        </div>


        <div className="admin-table-container">

          {recentRegistrations.length === 0 ? (
            <div className="admin-dashboard-message">
              No registrations available.
            </div>
          ) : (
            <table className="admin-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {recentRegistrations.map(
                  (registration) => (
                    <tr key={registration._id}>

                      <td>
                        {registration.userId
                          ? `${registration.userId.firstName || ""} ${
                              registration.userId.lastName || ""
                            }`.trim()
                          : "N/A"}
                      </td>

                      <td>
                        {registration.eventId?.title ||
                          "N/A"}
                      </td>

                      <td>
                        {formatDate(
                          registration.createdAt
                        )}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            registration.status ===
                            "CANCELLED"
                              ? "pending"
                              : "active"
                          }`}
                        >
                          {getRegistrationStatus(
                            registration.status
                          )}
                        </span>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;