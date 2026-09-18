import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrganizerDashboard.css";

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      name: "Tech Fest 2026",
      date: "15 Sep 2026",
      venue: "Main Auditorium",
      participants: 80,
      status: "Upcoming",
    },
    {
      id: 2,
      name: "AI Workshop",
      date: "20 Sep 2026",
      venue: "Seminar Hall",
      participants: 50,
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Hackathon",
      date: "25 Sep 2026",
      venue: "Lab Block",
      participants: 118,
      status: "Upcoming",
    },
  ];

  return (
    <div className="organizer-dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="page-subtitle">ORGANIZER PANEL</p>

          <h1>Organizer Dashboard</h1>

          <p className="dashboard-subtitle">
            Welcome back, Organizer!
          </p>
        </div>

        <button
          className="create-event-btn"
          onClick={() => navigate("/organizer/create-event")}
        >
          + Create Event
        </button>
      </div>

      {/* Statistics */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <h3>Total Events</h3>
          <p className="stat-number">12</p>
          <span className="stat-description">
            Events created
          </span>
        </div>

        <div className="stat-card">
          <h3>Upcoming Events</h3>
          <p className="stat-number">5</p>
          <span className="stat-description">
            Events scheduled
          </span>
        </div>

        <div className="stat-card">
          <h3>Total Participants</h3>
          <p className="stat-number">248</p>
          <span className="stat-description">
            Across all events
          </span>
        </div>

        <div className="stat-card">
          <h3>Registrations</h3>
          <p className="stat-number">186</p>
          <span className="stat-description">
            Total registrations
          </span>
        </div>

      </div>

      {/* Recent Events */}
      <div className="recent-events">

        <div className="recent-events-header">
          <div>
            <h2>Recent Events</h2>
            <p>
              Overview of your recently created events.
            </p>
          </div>

          <button
            className="view-events-btn"
            onClick={() => navigate("/organizer/my-events")}
          >
            View All
          </button>
        </div>

        <div className="table-wrapper">
          <table className="dashboard-table">

            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Participants</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="event-name">
                    {event.name}
                  </td>

                  <td>
                    {event.date}
                  </td>

                  <td>
                    {event.venue}
                  </td>

                  <td>
                    {event.participants}
                  </td>

                  <td>
                    <span className="event-status">
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default OrganizerDashboard;