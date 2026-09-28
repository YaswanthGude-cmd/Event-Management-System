import { useEffect, useState } from "react";
import "./ManageEvents.css";

const API_URL = import.meta.env.VITE_API_URL;
const ManageEvents = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await fetch(`${API_URL}/api/admin/events`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch events");
        return;
      }

      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const getOrganizerName = (event) => {
    if (!event.organizerId) {
      return "Unknown Organizer";
    }

    return (
      `${event.organizerId.firstName || ""} ${
        event.organizerId.lastName || ""
      }`.trim() || "Unknown Organizer"
    );
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleEdit = (event) => {
    setEditingEvent({
      _id: event._id,
      title: event.title || "",
      description: event.description || "",
      category: event.category || "",
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      time: event.time || "",
      venue: event.venue || "",
      capacity: event.capacity || "",
      registrationDeadline: event.registrationDeadline
        ? new Date(event.registrationDeadline).toISOString().slice(0, 16)
        : "",
      status: event.status || "UPCOMING",
    });
  };
  const handleView = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const handleCancel = async (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel "${event.title}"?`,
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/admin/events/${event._id}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to cancel event");
        return;
      }

      const updatedEvent = data.event || {};

      setEvents((prevEvents) =>
        prevEvents.map((currentEvent) =>
          currentEvent._id === event._id
            ? {
                ...currentEvent,
                ...updatedEvent,
                status: updatedEvent.status || "CANCELLED",
              }
            : currentEvent,
        ),
      );

      if (selectedEvent?._id === event._id) {
        setSelectedEvent((prev) => ({
          ...prev,
          ...updatedEvent,
          status: updatedEvent.status || "CANCELLED",
        }));
      }
    } catch (error) {
      console.error("Error cancelling event:", error);
      alert("Unable to connect to server");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${event.title}"?`,
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/admin/events/${event._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete event");
        return;
      }

      setEvents((prevEvents) =>
        prevEvents.filter((currentEvent) => currentEvent._id !== event._id),
      );

      setSelectedEvent(null);

      alert("Event deleted successfully.");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Unable to connect to server");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      setEditLoading(true);

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/admin/events/${editingEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editingEvent.title,
            description: editingEvent.description,
            category: editingEvent.category,
            date: editingEvent.date,
            time: editingEvent.time,
            venue: editingEvent.venue,
            capacity: Number(editingEvent.capacity),
            registrationDeadline: editingEvent.registrationDeadline,
            status: editingEvent.status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update event");
        return;
      }

      const updatedEvent = data.event || data;

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === editingEvent._id
            ? {
                ...event,
                ...updatedEvent,
                registrations: event.registrations,
                organizerId: event.organizerId,
              }
            : event,
        ),
      );

      setEditingEvent(null);

      alert("Event updated successfully.");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Unable to connect to server");
    } finally {
      setEditLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const eventName = (event.title || "").toLowerCase();

    const organizerName = getOrganizerName(event).toLowerCase();

    const searchValue = search.toLowerCase();

    const matchesSearch =
      eventName.includes(searchValue) || organizerName.includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || event.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="manage-events">
        <div className="admin-page-header">
          <div>
            <h1>Events</h1>
            <p>Manage all events created by organizers.</p>
          </div>
        </div>

        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-events">
        <div className="admin-page-header">
          <div>
            <h1>Events</h1>
            <p>Manage all events created by organizers.</p>
          </div>
        </div>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="manage-events">
      {/* HEADER */}
      <div className="admin-page-header">
        <div>
          <h1>Events</h1>

          <p>Manage all events created by organizers.</p>
        </div>
      </div>

      {/* TOOLBAR */}
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
          <option value="UPCOMING">Upcoming</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
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
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="8">No events found.</td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event._id}>
                    <td>#{event._id.slice(-6)}</td>

                    <td>
                      <strong>{event.title}</strong>
                    </td>

                    <td>{getOrganizerName(event)}</td>

                    <td>{event.category}</td>

                    <td>{formatDate(event.date)}</td>

                    <td>{event.registrations || 0}</td>

                    <td>
                      <span
                        className={`event-status ${event.status.toLowerCase()}`}
                      >
                        {event.status}
                      </span>
                    </td>

                    <td>
                      <div className="event-actions">
                        <button
                          className="event-view-btn"
                          onClick={() => handleView(event)}
                        >
                          View
                        </button>

                        <button
                          className="event-edit-btn"
                          onClick={() => handleEdit(event)}
                        >
                          Edit
                        </button>

                        <button
                          className="event-delete-btn"
                          onClick={() => handleDelete(event)}
                          disabled={actionLoading}
                        >
                          Delete
                        </button>
                      </div>

                      {/* EDIT EVENT MODAL */}

                      {editingEvent && (
                        <div className="event-modal-overlay">
                          <div className="event-edit-modal">
                            <div className="event-modal-header">
                              <h2>Edit Event</h2>

                              <button
                                className="event-close-btn"
                                onClick={() => setEditingEvent(null)}
                              >
                                ×
                              </button>
                            </div>

                            <form
                              className="event-edit-form"
                              onSubmit={handleUpdateEvent}
                            >
                              <div className="edit-form-group">
                                <label>Event Title</label>

                                <input
                                  type="text"
                                  value={editingEvent.title}
                                  onChange={(e) =>
                                    setEditingEvent({
                                      ...editingEvent,
                                      title: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>

                              <div className="edit-form-group">
                                <label>Description</label>

                                <textarea
                                  value={editingEvent.description}
                                  onChange={(e) =>
                                    setEditingEvent({
                                      ...editingEvent,
                                      description: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>

                              <div className="edit-form-row">
                                <div className="edit-form-group">
                                  <label>Category</label>

                                  <input
                                    type="text"
                                    value={editingEvent.category}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        category: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>

                                <div className="edit-form-group">
                                  <label>Status</label>

                                  <select
                                    value={editingEvent.status}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        status: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="UPCOMING">Upcoming</option>

                                    <option value="ONGOING">Ongoing</option>

                                    <option value="COMPLETED">Completed</option>

                                    <option value="CANCELLED">Cancelled</option>
                                  </select>
                                </div>
                              </div>

                              <div className="edit-form-row">
                                <div className="edit-form-group">
                                  <label>Date</label>

                                  <input
                                    type="date"
                                    value={editingEvent.date}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        date: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>

                                <div className="edit-form-group">
                                  <label>Time</label>

                                  <input
                                    type="text"
                                    value={editingEvent.time}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        time: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                              </div>

                              <div className="edit-form-group">
                                <label>Venue</label>

                                <input
                                  type="text"
                                  value={editingEvent.venue}
                                  onChange={(e) =>
                                    setEditingEvent({
                                      ...editingEvent,
                                      venue: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>

                              <div className="edit-form-row">
                                <div className="edit-form-group">
                                  <label>Capacity</label>

                                  <input
                                    type="number"
                                    min="1"
                                    value={editingEvent.capacity}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        capacity: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>

                                <div className="edit-form-group">
                                  <label>Registration Deadline</label>

                                  <input
                                    type="datetime-local"
                                    value={editingEvent.registrationDeadline}
                                    onChange={(e) =>
                                      setEditingEvent({
                                        ...editingEvent,
                                        registrationDeadline: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                              </div>

                              <div className="edit-form-actions">
                                <button
                                  type="button"
                                  className="edit-cancel-btn"
                                  onClick={() => setEditingEvent(null)}
                                  disabled={editLoading}
                                >
                                  Cancel
                                </button>

                                <button
                                  type="submit"
                                  className="edit-save-btn"
                                  disabled={editLoading}
                                >
                                  {editLoading ? "Saving..." : "Save Changes"}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW EVENT MODAL */}
      {selectedEvent && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <div className="event-modal-header">
              <h2>Event Details</h2>

              <button className="event-close-btn" onClick={closeEventDetails}>
                ×
              </button>
            </div>

            <div className="event-modal-body">
              <div className="event-detail">
                <strong>Title</strong>
                <span>{selectedEvent.title}</span>
              </div>

              <div className="event-detail">
                <strong>Organizer</strong>
                <span>{getOrganizerName(selectedEvent)}</span>
              </div>

              <div className="event-detail">
                <strong>Category</strong>
                <span>{selectedEvent.category}</span>
              </div>

              <div className="event-detail">
                <strong>Date</strong>
                <span>{formatDate(selectedEvent.date)}</span>
              </div>

              <div className="event-detail">
                <strong>Time</strong>
                <span>{selectedEvent.time}</span>
              </div>

              <div className="event-detail">
                <strong>Venue</strong>
                <span>{selectedEvent.venue}</span>
              </div>

              <div className="event-detail">
                <strong>Capacity</strong>
                <span>{selectedEvent.capacity}</span>
              </div>

              <div className="event-detail">
                <strong>Registrations</strong>
                <span>{selectedEvent.registrations || 0}</span>
              </div>

              <div className="event-detail">
                <strong>Status</strong>
                <span>{selectedEvent.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
