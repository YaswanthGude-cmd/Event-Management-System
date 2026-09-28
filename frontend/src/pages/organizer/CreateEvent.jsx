import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    category: "",
    date: "",
    time: "",
    venue: "",
    capacity: "",
    registrationDeadline: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const organizerId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!organizerId || !token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: event.name,
            description: event.description,
            category: event.category,
            date: event.date,
            time: event.time,
            venue: event.venue,
            capacity: Number(event.capacity),
            registrationDeadline: event.registrationDeadline,
            organizerId: organizerId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create event");
        return;
      }

      alert("Event created successfully!");

      navigate("/organizer/my-events");

    } catch (error) {
      console.error("Error creating event:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">

      <div className="create-event-header">
        <div>
          <p className="page-subtitle">
            EVENT MANAGEMENT
          </p>

          <h1>Create New Event</h1>

          <p className="page-description">
            Fill in the details below to create and publish a new event.
          </p>
        </div>
      </div>

      <form
        className="create-event-form"
        onSubmit={handleSubmit}
      >

        <div className="form-section-title">
          <h2>Event Details</h2>

          <p>
            Provide the basic information about your event.
          </p>
        </div>

        {/* Event Name */}
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

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">
            Category <span>*</span>
          </label>

          <input
            id="category"
            type="text"
            name="category"
            value={event.category}
            onChange={handleChange}
            placeholder="Example: Technical, Workshop, Cultural"
            required
          />
        </div>

        {/* Date and Time */}
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

        {/* Venue */}
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

        {/* Capacity */}
        <div className="form-group">
          <label htmlFor="capacity">
            Capacity <span>*</span>
          </label>

          <input
            id="capacity"
            type="number"
            name="capacity"
            value={event.capacity}
            onChange={handleChange}
            placeholder="Enter maximum participants"
            min="1"
            required
          />
        </div>

        {/* Registration Deadline */}
        <div className="form-group">
          <label htmlFor="registrationDeadline">
            Registration Deadline <span>*</span>
          </label>

          <input
            id="registrationDeadline"
            type="date"
            name="registrationDeadline"
            value={event.registrationDeadline}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">
            Description <span>*</span>
          </label>

          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Describe your event..."
            rows="6"
            required
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <div className="create-event-actions">

          <button
            type="submit"
            className="create-event-submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default CreateEvent;