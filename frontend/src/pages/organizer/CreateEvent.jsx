import React, { useState } from "react";

const CreateEvent = () => {

  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    description: ""
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
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
      description: ""
    });
  };

  return (
    <div style={styles.container}>

      <h1>Create Event</h1>

      <form onSubmit={handleSubmit} style={styles.form}>

        <label>Event Name</label>
        <input
          type="text"
          name="name"
          value={event.name}
          onChange={handleChange}
          placeholder="Enter event name"
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        />

        <label>Time</label>
        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleChange}
          required
        />

        <label>Venue</label>
        <input
          type="text"
          name="venue"
          value={event.venue}
          onChange={handleChange}
          placeholder="Enter venue"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
          placeholder="Enter event description"
          rows="5"
        />

        <button type="submit">
          Create Event
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

export default CreateEvent;