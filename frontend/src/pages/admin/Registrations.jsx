import { useState } from "react";
import "./Registrations.css";

const Registrations = () => {
  const [search, setSearch] = useState("");

  const registrations = [
    {
      id: 1,
      user: "Vamsi Krishna",
      email: "vamsi@gmail.com",
      event: "Tech Fest 2026",
      date: "08 Sep 2026",
      status: "Confirmed",
    },
    {
      id: 2,
      user: "Harsha Vardhan",
      email: "harsha@gmail.com",
      event: "Hackathon 2026",
      date: "08 Sep 2026",
      status: "Confirmed",
    },
    {
      id: 3,
      user: "Anjali Rao",
      email: "anjali@gmail.com",
      event: "AI & ML Seminar",
      date: "07 Sep 2026",
      status: "Pending",
    },
    {
      id: 4,
      user: "Kiran Kumar",
      email: "kiran@gmail.com",
      event: "Web Development Workshop",
      date: "06 Sep 2026",
      status: "Cancelled",
    },
  ];

  const filteredRegistrations = registrations.filter(
    (registration) =>
      registration.user
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      registration.event
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="registrations-page">

      <div className="admin-page-header">
        <div>
          <h1>Registrations</h1>

          <p>
            View and manage event registrations.
          </p>
        </div>
      </div>


      <div className="registrations-toolbar">

        <input
          type="text"
          placeholder="Search registrations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span>
          {filteredRegistrations.length} Registrations
        </span>

      </div>


      <div className="registrations-table-card">

        <div className="registrations-table-container">

          <table className="registrations-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Event</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredRegistrations.map((registration) => (
                <tr key={registration.id}>

                  <td>#{registration.id}</td>

                  <td>{registration.user}</td>

                  <td>{registration.email}</td>

                  <td>{registration.event}</td>

                  <td>{registration.date}</td>

                  <td>
                    <span
                      className={`registration-status ${registration.status.toLowerCase()}`}
                    >
                      {registration.status}
                    </span>
                  </td>

                  <td>
                    <button className="registration-view-btn">
                      View
                    </button>
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