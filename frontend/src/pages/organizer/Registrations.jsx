import React from "react";
import "./Registrations.css";

const Registrations = () => {
  const registrations = [
    {
      id: 1,
      participant: "Rahul",
      event: "Tech Fest 2026",
      date: "05 Sep 2026",
      status: "Confirmed",
    },
    {
      id: 2,
      participant: "Priya",
      event: "AI Workshop",
      date: "06 Sep 2026",
      status: "Confirmed",
    },
    {
      id: 3,
      participant: "Arjun",
      event: "Hackathon",
      date: "07 Sep 2026",
      status: "Pending",
    },
  ];

  const confirmedCount = registrations.filter(
    (registration) => registration.status === "Confirmed"
  ).length;

  const pendingCount = registrations.filter(
    (registration) => registration.status === "Pending"
  ).length;

  return (
    <div className="registrations-page">

      {/* Page Header */}
      <div className="registrations-header">
        <div>
          <h1>Registrations</h1>
          <p>
            View and manage registrations for your events.
          </p>
        </div>

        <div className="registrations-summary">
          <div>
            <span>Total</span>
            <strong>{registrations.length}</strong>
          </div>

          <div>
            <span>Confirmed</span>
            <strong className="confirmed-count">
              {confirmedCount}
            </strong>
          </div>

          <div>
            <span>Pending</span>
            <strong className="pending-count">
              {pendingCount}
            </strong>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="registrations-table-container">

        <div className="table-header">
          <div>
            <h2>All Registrations</h2>
            <p>
              Track participant registrations and their current status.
            </p>
          </div>
        </div>

        <div className="table-wrapper">

          <table className="registrations-table">

            <thead>
              <tr>
                <th>Participant</th>
                <th>Event</th>
                <th>Registration Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {registrations.map((registration) => (
                <tr key={registration.id}>

                  {/* Participant */}
                  <td>
                    <div className="registration-participant">

                      <div className="participant-avatar">
                        {registration.participant.charAt(0)}
                      </div>

                      <span>
                        {registration.participant}
                      </span>

                    </div>
                  </td>

                  {/* Event */}
                  <td>
                    <span className="registration-event">
                      {registration.event}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="registration-date">
                    {registration.date}
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`registration-status ${registration.status.toLowerCase()}`}
                    >
                      {registration.status}
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

export default Registrations;