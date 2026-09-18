import React, { useState } from "react";
import "./CreateEvent.css";

const CreateEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    description: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Event Created:", event);

    alert("Event created successfully!");

    setEvent({
      name: "",
      date: "",
      time: "",
      venue: "",
      description: "",
    });
  };

  return (
    <div className="create-event-page">
      <div className="create-event-header">
        <div>
          <p className="page-subtitle">EVENT MANAGEMENT</p>
          <h1>Create New Event</h1>
          <p className="page-description">
            Fill in the details below to create and publish a new event.
          </p>
        </div>
      </div>

      <form className="create-event-form" onSubmit={handleSubmit}>
        <div className="form-section-title">
          <h2>Event Details</h2>
          <p>Provide the basic information about your event.</p>
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
            placeholder="Describe your event..."
            rows="6"
          />
        </div>

        <div className="create-event-actions">
          <button
            type="submit"
            className="create-event-submit"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;