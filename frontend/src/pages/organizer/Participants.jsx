import React from "react";
import "./Participants.css";

const Participants = () => {
  const participants = [
    {
      id: 1,
      name: "Rahul",
      email: "rahul@gmail.com",
      event: "Tech Fest 2026",
    },
    {
      id: 2,
      name: "Priya",
      email: "priya@gmail.com",
      event: "AI Workshop",
    },
    {
      id: 3,
      name: "Arjun",
      email: "arjun@gmail.com",
      event: "Hackathon",
    },
  ];

  return (
    <div className="participants-page">

      {/* Page Header */}
      <div className="participants-header">
        <div>
          <h1>Participants</h1>
          <p>
            View participants registered for your events.
          </p>
        </div>

        <div className="participant-count">
          <span>Total Participants</span>
          <strong>{participants.length}</strong>
        </div>
      </div>

      {/* Participants Table */}
      <div className="participants-table-container">

        <div className="table-header">
          <div>
            <h2>Registered Participants</h2>
            <p>
              List of users registered for your events.
            </p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="participants-table">

            <thead>
              <tr>
                <th>Participant</th>
                <th>Email Address</th>
                <th>Event</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id}>

                  <td>
                    <div className="participant-info">

                      <div className="participant-avatar">
                        {participant.name.charAt(0)}
                      </div>

                      <span className="participant-name">
                        {participant.name}
                      </span>

                    </div>
                  </td>

                  <td className="participant-email">
                    {participant.email}
                  </td>

                  <td>
                    <span className="event-badge">
                      {participant.event}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default Participants;