import React from "react";

const OrganizerProfile = () => {
  return (
    <div style={styles.container}>

      <h1>Organizer Profile</h1>

      <div style={styles.card}>

        <div style={styles.avatar}>
          O
        </div>

        <h2>Organizer</h2>

        <p>Email: organizer@example.com</p>

        <p>Role: Event Organizer</p>

        <button style={styles.button}>
          Edit Profile
        </button>

      </div>

    </div>
  );
};

const styles = {
  container: {
    padding: "30px"
  },

  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "500px"
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    fontWeight: "bold"
  },

  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#2563eb",
    color: "white"
  }
};

export default OrganizerProfile;