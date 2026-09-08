import { useState } from "react";
import "./ManageOrganizers.css";

const ManageOrganizers = () => {
  const [search, setSearch] = useState("");

  const organizers = [
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul.organizer@gmail.com",
      organization: "Tech Club",
      events: 8,
      status: "Approved",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.organizer@gmail.com",
      organization: "Code Community",
      events: 5,
      status: "Approved",
    },
    {
      id: 3,
      name: "Arjun Reddy",
      email: "arjun.organizer@gmail.com",
      organization: "Innovation Hub",
      events: 3,
      status: "Pending",
    },
    {
      id: 4,
      name: "Sneha Rao",
      email: "sneha.organizer@gmail.com",
      organization: "AI Society",
      events: 6,
      status: "Approved",
    },
  ];

  const filteredOrganizers = organizers.filter(
    (organizer) =>
      organizer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      organizer.organization
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="manage-organizers">

      <div className="admin-page-header">
        <div>
          <h1>Organizers</h1>
          <p>Manage event organizers and their accounts.</p>
        </div>
      </div>


      <div className="organizers-toolbar">

        <input
          type="text"
          placeholder="Search organizers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span>
          {filteredOrganizers.length} Organizers
        </span>

      </div>


      <div className="organizers-table-card">

        <div className="organizers-table-container">

          <table className="organizers-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Organizer</th>
                <th>Organization</th>
                <th>Email</th>
                <th>Events</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredOrganizers.map((organizer) => (
                <tr key={organizer.id}>

                  <td>#{organizer.id}</td>

                  <td>
                    <div className="organizer-name">

                      <div className="organizer-avatar">
                        {organizer.name.charAt(0)}
                      </div>

                      {organizer.name}

                    </div>
                  </td>

                  <td>{organizer.organization}</td>

                  <td>{organizer.email}</td>

                  <td>{organizer.events}</td>

                  <td>
                    <span
                      className={`organizer-status ${
                        organizer.status === "Approved"
                          ? "approved"
                          : "pending"
                      }`}
                    >
                      {organizer.status}
                    </span>
                  </td>

                  <td>

                    <div className="organizer-actions">

                      <button className="organizer-view-btn">
                        View
                      </button>

                      {organizer.status === "Pending" && (
                        <button className="approve-btn">
                          Approve
                        </button>
                      )}

                    </div>

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

export default ManageOrganizers;