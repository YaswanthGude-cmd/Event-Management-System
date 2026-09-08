import { useState } from "react";
import "./ManageEvents.css";

const ManageEvents = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const events = [
    {
      id: 1,
      name: "Tech Fest 2026",
      organizer: "Rahul Kumar",
      category: "Technology",
      date: "15 Sep 2026",
      registrations: 120,
      status: "Active",
    },
    {
      id: 2,
      name: "Hackathon 2026",
      organizer: "Priya Sharma",
      category: "Coding",
      date: "20 Sep 2026",
      registrations: 85,
      status: "Pending",
    },
    {
      id: 3,
      name: "AI & ML Seminar",
      organizer: "Sneha Rao",
      category: "Seminar",
      date: "10 Sep 2026",
      registrations: 64,
      status: "Active",
    },
    {
      id: 4,
      name: "Web Development Workshop",
      organizer: "Arjun Reddy",
      category: "Workshop",
      date: "05 Sep 2026",
      registrations: 45,
      status: "Completed",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.organizer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      event.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="manage-events">

      <div className="admin-page-header">

        <div>
          <h1>Events</h1>

          <p>
            Manage all events created by organizers.
          </p>
        </div>

        <button className="create-event-btn">
          + Create Event
        </button>

      </div>


      <div className="events-toolbar">

        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

      </div>


      <div className="events-table-card">

        <div className="events-table-container">

          <table className="events-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Event</th>
                <th>Organizer</th>
                <th>Category</th>
                <th>Date</th>
                <th>Registrations</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredEvents.map((event) => (
                <tr key={event.id}>

                  <td>#{event.id}</td>

                  <td>
                    <strong>{event.name}</strong>
                  </td>

                  <td>{event.organizer}</td>

                  <td>{event.category}</td>

                  <td>{event.date}</td>

                  <td>{event.registrations}</td>

                  <td>
                    <span
                      className={`event-status ${event.status.toLowerCase()}`}
                    >
                      {event.status}
                    </span>
                  </td>

                  <td>

                    <div className="event-actions">

                      <button className="event-view-btn">
                        View
                      </button>

                      <button className="event-edit-btn">
                        Edit
                      </button>

                      <button className="event-delete-btn">
                        Delete
                      </button>

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

export default ManageEvents;