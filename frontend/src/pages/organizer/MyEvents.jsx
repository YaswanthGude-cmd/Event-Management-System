import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyEvents.css";

const MyEvents = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      name: "Tech Fest 2026",
      date: "15 Sep 2026",
      venue: "Main Auditorium",
      participants: 80,
    },
    {
      id: 2,
      name: "AI Workshop",
      date: "20 Sep 2026",
      venue: "Seminar Hall",
      participants: 50,
    },
  ];

  const handleEdit = (eventId) => {
    console.log("Edit event:", eventId);
    navigate("/organizer/edit-event");
  };

  const handleDelete = (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmDelete) {
      console.log("Delete event:", eventId);
      alert("Event deleted successfully!");
    }
  };

  return (
    <div className="my-events-page">
      <div className="my-events-header">
        <p className="page-subtitle">EVENT MANAGEMENT</p>

        <h1>My Events</h1>

        <p className="page-description">
          View and manage all the events you have created.
        </p>
      </div>

      <div className="events-container">
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-card-header">
                <h2>{event.name}</h2>

                <span className="event-status">
                  Active
                </span>
              </div>

              <div className="event-details">
                <div className="event-detail">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">
                    {event.date}
                  </span>
                </div>

                <div className="event-detail">
                  <span className="detail-label">Venue</span>
                  <span className="detail-value">
                    {event.venue}
                  </span>
                </div>

                <div className="event-detail">
                  <span className="detail-label">Participants</span>
                  <span className="detail-value">
                    {event.participants}
                  </span>
                </div>
              </div>

              <div className="event-actions">
                <button
                  className="edit-event-btn"
                  onClick={() => handleEdit(event.id)}
                >
                  Edit Event
                </button>

                <button
                  className="delete-event-btn"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;