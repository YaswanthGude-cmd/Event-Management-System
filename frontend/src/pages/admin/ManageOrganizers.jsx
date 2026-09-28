import { useEffect, useState } from "react";
import "./ManageOrganizers.css";

const API_URL = import.meta.env.VITE_API_URL;
const ManageOrganizers = () => {
  const [search, setSearch] = useState("");
  const [organizers, setOrganizers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/organizers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch organizers");
        return;
      }

      setOrganizers(data.organizers || []);
    } catch (error) {
      console.error("Error fetching organizers:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockToggle = async (organizer) => {
    const isBlocked = organizer.status === "BLOCKED";

    const action = isBlocked ? "unblock" : "block";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this organizer?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/admin/users/${organizer._id}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || `Failed to ${action} organizer`);
        return;
      }

      const updatedOrganizer = data.user || data;

      setOrganizers((prevOrganizers) =>
        prevOrganizers.map((currentOrganizer) =>
          currentOrganizer._id === organizer._id
            ? {
                ...currentOrganizer,
                ...updatedOrganizer,
                status:
                  updatedOrganizer.status ||
                  (isBlocked ? "ACTIVE" : "BLOCKED"),
              }
            : currentOrganizer
        )
      );

      if (selectedOrganizer?._id === organizer._id) {
        setSelectedOrganizer((prev) => ({
          ...prev,
          ...updatedOrganizer,
          status:
            updatedOrganizer.status ||
            (isBlocked ? "ACTIVE" : "BLOCKED"),
        }));
      }
    } catch (error) {
      console.error(`Error trying to ${action} organizer:`, error);
      alert("Unable to connect to server");
    } finally {
      setActionLoading(false);
    }
  };

  const handleView = (organizer) => {
    setSelectedOrganizer(organizer);
  };

  const closeOrganizerDetails = () => {
    setSelectedOrganizer(null);
  };

  const getFullName = (organizer) => {
    const fullName = `${organizer.firstName || ""} ${
      organizer.lastName || ""
    }`.trim();

    return fullName || "Unknown Organizer";
  };

  const filteredOrganizers = organizers.filter((organizer) => {
    const fullName = getFullName(organizer).toLowerCase();

    return (
      fullName.includes(search.toLowerCase()) ||
      (organizer.email || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="manage-organizers">
        <div className="admin-page-header">
          <div>
            <h1>Organizers</h1>
            <p>Manage event organizers and their accounts.</p>
          </div>
        </div>

        <p>Loading organizers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-organizers">
        <div className="admin-page-header">
          <div>
            <h1>Organizers</h1>
            <p>Manage event organizers and their accounts.</p>
          </div>
        </div>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="manage-organizers">

      {/* HEADER */}
      <div className="admin-page-header">
        <div>
          <h1>Organizers</h1>
          <p>Manage event organizers and their accounts.</p>
        </div>
      </div>

      {/* TOOLBAR */}
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

      {/* TABLE */}
      <div className="organizers-table-card">

        <div className="organizers-table-container">

          <table className="organizers-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Organizer</th>
                <th>Email</th>
                <th>Events</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredOrganizers.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    No organizers found.
                  </td>
                </tr>
              ) : (
                filteredOrganizers.map((organizer) => (

                  <tr key={organizer._id}>

                    <td>
                      #{organizer._id.slice(-6)}
                    </td>

                    <td>
                      <div className="organizer-name">

                        <div className="organizer-avatar">
                          {getFullName(organizer).charAt(0)}
                        </div>

                        {getFullName(organizer)}

                      </div>
                    </td>

                    <td>
                      {organizer.email}
                    </td>

                    <td>
                      {organizer.events}
                    </td>

                    <td>
                      <span
                        className={`organizer-status ${
                          organizer.status === "ACTIVE"
                            ? "approved"
                            : "pending"
                        }`}
                      >
                        {organizer.status}
                      </span>
                    </td>

                    <td>

                      <div className="organizer-actions">

                        <button
                          className="organizer-view-btn"
                          onClick={() => handleView(organizer)}
                        >
                          View
                        </button>

                        <button
                          className={
                            organizer.status === "BLOCKED"
                              ? "approve-btn"
                              : "organizer-block-btn"
                          }
                          onClick={() =>
                            handleBlockToggle(organizer)
                          }
                          disabled={actionLoading}
                        >
                          {organizer.status === "BLOCKED"
                            ? "Unblock"
                            : "Block"}
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* VIEW ORGANIZER MODAL */}
      {selectedOrganizer && (
        <div className="organizer-modal-overlay">

          <div className="organizer-modal">

            <div className="organizer-modal-header">
              <h2>Organizer Details</h2>

              <button
                onClick={closeOrganizerDetails}
                className="organizer-close-btn"
              >
                ×
              </button>
            </div>

            <div className="organizer-modal-body">

              <div className="organizer-detail">
                <strong>Name</strong>
                <span>
                  {getFullName(selectedOrganizer)}
                </span>
              </div>

              <div className="organizer-detail">
                <strong>Email</strong>
                <span>
                  {selectedOrganizer.email}
                </span>
              </div>

              <div className="organizer-detail">
                <strong>Phone</strong>
                <span>
                  {selectedOrganizer.phone}
                </span>
              </div>

              <div className="organizer-detail">
                <strong>Role</strong>
                <span>
                  {selectedOrganizer.role}
                </span>
              </div>

              <div className="organizer-detail">
                <strong>Events</strong>
                <span>
                  {selectedOrganizer.events}
                </span>
              </div>

              <div className="organizer-detail">
                <strong>Status</strong>
                <span>
                  {selectedOrganizer.status}
                </span>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ManageOrganizers;