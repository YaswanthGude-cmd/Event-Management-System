
import React, { useState } from "react";
import "./EditEvent.css";

const EditEvent = () => {
  const [event, setEvent] = useState({
    name: "Tech Fest 2026",
    date: "2026-09-15",
    time: "10:00",
    venue: "Main Auditorium",
    description: "Annual technical festival",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Event:", event);

    alert("Event updated successfully!");
  };

  return (
    <div className="edit-event-page">
      <div className="edit-event-header">
        <p className="page-subtitle">EVENT MANAGEMENT</p>

        <h1>Edit Event</h1>

        <p className="page-description">
          Update the details of your existing event.
        </p>
      </div>

      <form
        className="edit-event-form"
        onSubmit={handleSubmit}
      >
        <div className="form-section-title">
          <h2>Event Details</h2>

          <p>
            Modify the information below and save your changes.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="name">
            Event Name <span>*</span>
          </label>

          <input
            id="name"
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              Event Date <span>*</span>
            </label>

            <input
              id="date"
              type="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">
              Event Time <span>*</span>
            </label>

            <input
              id="time"
              type="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="venue">
            Venue <span>*</span>
          </label>

          <input
            id="venue"
            type="text"
            name="venue"
            value={event.venue}
            onChange={handleChange}
            placeholder="Enter event venue"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Enter event description"
            rows="6"
          />
        </div>

        <div className="edit-event-actions">
          <button
            type="submit"
            className="update-event-btn"
          >
            Update Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;