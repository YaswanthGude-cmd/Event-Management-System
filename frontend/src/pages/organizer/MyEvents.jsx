import React from "react";

const MyEvents = () => {

  const events = [
    {
      id: 1,
      name: "Tech Fest 2026",
      date: "15 Sep 2026",
      venue: "Main Auditorium",
      participants: 80
    },
    {
      id: 2,
      name: "AI Workshop",
      date: "20 Sep 2026",
      venue: "Seminar Hall",
      participants: 50
    }
  ];

  return (
    <div style={styles.container}>

      <h1>My Events</h1>

      <div style={styles.grid}>

        {events.map((event) => (
          <div style={styles.card} key={event.id}>

            <h2>{event.name}</h2>

            <p>📅 {event.date}</p>

            <p>📍 {event.venue}</p>

            <p>👥 Participants: {event.participants}</p>

            <div>
              <button style={styles.edit}>
                Edit
              </button>

              <button style={styles.delete}>
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

const styles = {
  container: {
    padding: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px"
  },

  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },

  edit: {
    marginRight: "10px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  delete: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default MyEvents;