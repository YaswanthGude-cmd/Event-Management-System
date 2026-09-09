import React from "react";

const Participants = () => {

  const participants = [
    {
      id: 1,
      name: "Rahul",
      email: "rahul@gmail.com",
      event: "Tech Fest 2026"
    },
    {
      id: 2,
      name: "Priya",
      email: "priya@gmail.com",
      event: "AI Workshop"
    },
    {
      id: 3,
      name: "Arjun",
      email: "arjun@gmail.com",
      event: "Hackathon"
    }
  ];

  return (
    <div style={styles.container}>

      <h1>Participants</h1>

      <table style={styles.table}>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event</th>
          </tr>
        </thead>

        <tbody>

          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.name}</td>
              <td>{participant.email}</td>
              <td>{participant.event}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

const styles = {
  container: {
    padding: "30px"
  },

  table: {
    width: "100%",
    backgroundColor: "white",
    borderCollapse: "collapse"
  }
};

export default Participants;