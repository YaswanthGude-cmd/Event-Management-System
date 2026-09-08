import React from "react";

const Registrations = () => {

  const registrations = [
    {
      id: 1,
      participant: "Rahul",
      event: "Tech Fest 2026",
      date: "05 Sep 2026",
      status: "Confirmed"
    },
    {
      id: 2,
      participant: "Priya",
      event: "AI Workshop",
      date: "06 Sep 2026",
      status: "Confirmed"
    },
    {
      id: 3,
      participant: "Arjun",
      event: "Hackathon",
      date: "07 Sep 2026",
      status: "Pending"
    }
  ];

  return (
    <div style={styles.container}>

      <h1>Registrations</h1>

      <table style={styles.table}>

        <thead>
          <tr>
            <th>Participant</th>
            <th>Event</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {registrations.map((registration) => (
            <tr key={registration.id}>

              <td>{registration.participant}</td>

              <td>{registration.event}</td>

              <td>{registration.date}</td>

              <td>{registration.status}</td>

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

export default Registrations;