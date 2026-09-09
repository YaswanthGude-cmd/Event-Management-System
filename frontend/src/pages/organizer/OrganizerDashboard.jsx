import React from "react";

const OrganizerDashboard = () => {
  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Organizer Dashboard</h1>
          <p style={styles.subtitle}>
            Welcome back, Organizer!
          </p>
        </div>

        <button style={styles.createButton}>
          + Create Event
        </button>
      </div>

      {/* Statistics */}

      <div style={styles.statsContainer}>

        <div style={styles.card}>
          <h3>Total Events</h3>
          <p style={styles.number}>12</p>
        </div>

        <div style={styles.card}>
          <h3>Upcoming Events</h3>
          <p style={styles.number}>5</p>
        </div>

        <div style={styles.card}>
          <h3>Total Participants</h3>
          <p style={styles.number}>248</p>
        </div>

        <div style={styles.card}>
          <h3>Registrations</h3>
          <p style={styles.number}>186</p>
        </div>

      </div>

      {/* Recent Events */}

      <div style={styles.eventsSection}>

        <h2>Recent Events</h2>

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>Event Name</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Venue</th>
              <th style={styles.th}>Participants</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td style={styles.td}>Tech Fest 2026</td>
              <td style={styles.td}>15 Sep 2026</td>
              <td style={styles.td}>Main Auditorium</td>
              <td style={styles.td}>80</td>
              <td style={styles.td}>Upcoming</td>
            </tr>

            <tr>
              <td style={styles.td}>AI Workshop</td>
              <td style={styles.td}>20 Sep 2026</td>
              <td style={styles.td}>Seminar Hall</td>
              <td style={styles.td}>50</td>
              <td style={styles.td}>Upcoming</td>
            </tr>

            <tr>
              <td style={styles.td}>Hackathon</td>
              <td style={styles.td}>25 Sep 2026</td>
              <td style={styles.td}>Lab Block</td>
              <td style={styles.td}>118</td>
              <td style={styles.td}>Upcoming</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

const styles = {
  container: {
    padding: "30px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  title: {
    margin: 0,
    fontSize: "30px",
    color: "#111827"
  },

  subtitle: {
    color: "#6b7280"
  },

  createButton: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px"
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "30px"
  },

  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },

  number: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2563eb",
    margin: "10px 0 0"
  },

  eventsSection: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  },

  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #e5e7eb"
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb"
  }
};

export default OrganizerDashboard;