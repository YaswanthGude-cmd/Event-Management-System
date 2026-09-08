import React, { useState } from "react";

const EditEvent = () => {

  const [event, setEvent] = useState({
    name: "Tech Fest 2026",
    date: "2026-09-15",
    time: "10:00",
    venue: "Main Auditorium",
    description: "Annual technical festival"
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Event:", event);

    alert("Event updated successfully!");
  };

  return (
    <div style={styles.container}>

      <h1>Edit Event</h1>

      <form onSubmit={handleSubmit} style={styles.form}>

        <label>Event Name</label>
        <input
          name="name"
          value={event.name}
          onChange={handleChange}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
        />

        <label>Time</label>
        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleChange}
        />

        <label>Venue</label>
        <input
          name="venue"
          value={event.venue}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
        />

        <button type="submit">
          Update Event
        </button>

      </form>

    </div>
  );
};

const styles = {
  container: {
    padding: "30px"
  },

  form: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};

export default EditEvent;