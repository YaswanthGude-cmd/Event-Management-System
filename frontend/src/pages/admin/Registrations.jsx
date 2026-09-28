import { useEffect, useState } from "react";
import "./Registrations.css";

const API_URL = import.meta.env.VITE_API_URL;
const Registrations = () => {

  const [search, setSearch] = useState("");

  const [registrations, setRegistrations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);


  // ================= FETCH REGISTRATIONS =================

  useEffect(() => {
    fetchRegistrations();
  }, []);


  const fetchRegistrations = async () => {

    try {

      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/admin/registrations`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to fetch registrations"
        );
        return;
      }

      setRegistrations(data.registrations || []);

    } catch (error) {

      console.error(
        "Error fetching registrations:",
        error
      );

      setError("Unable to connect to server");

    } finally {

      setLoading(false);

    }
  };


  // ================= SEARCH =================

  const filteredRegistrations =
    registrations.filter((registration) => {

      const user =
        registration.userId
          ? `${registration.userId.firstName || ""} ${
              registration.userId.lastName || ""
            }`
          : "";

      const email =
        registration.userId?.email || "";

      const event =
        registration.eventId?.title || "";

      const searchValue =
        search.toLowerCase();

      return (
        user.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue) ||
        event.toLowerCase().includes(searchValue)
      );

    });


  // ================= VIEW =================

  const handleView = async (registrationId) => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/admin/registrations/${registrationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
          "Failed to fetch registration"
        );
        return;
      }

      setSelectedRegistration(data);

    } catch (error) {

      console.error(
        "Error fetching registration:",
        error
      );

      alert("Unable to connect to server");

    }
  };


  // ================= CANCEL =================

  const handleCancel = async (registrationId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmCancel) {
      return;
    }

    try {

      setActionLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/admin/registrations/${registrationId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
          "Failed to cancel registration"
        );
        return;
      }

      // Update table immediately
      setRegistrations((prev) =>
        prev.map((registration) =>
          registration._id === registrationId
            ? {
                ...registration,
                status: "CANCELLED",
              }
            : registration
        )
      );

      alert("Registration cancelled successfully.");

    } catch (error) {

      console.error(
        "Error cancelling registration:",
        error
      );

      alert("Unable to connect to server");

    } finally {

      setActionLoading(false);

    }
  };


  // ================= STATUS =================

  const getStatusClass = (status) => {

    if (status === "REGISTERED") {
      return "confirmed";
    }

    if (status === "CANCELLED") {
      return "cancelled";
    }

    return "pending";
  };


  const getStatusText = (status) => {

    if (status === "REGISTERED") {
      return "Registered";
    }

    if (status === "CANCELLED") {
      return "Cancelled";
    }

    return status;

  };


  return (
    <div className="registrations-page">

      {/* ================= HEADER ================= */}

      <div className="admin-page-header">

        <div>

          <h1>Registrations</h1>

          <p>
            View and manage event registrations.
          </p>

        </div>

      </div>


      {/* ================= TOOLBAR ================= */}

      <div className="registrations-toolbar">

        <input
          type="text"
          placeholder="Search by user, email or event..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <span>
          {filteredRegistrations.length} Registrations
        </span>

      </div>


      {/* ================= ERROR ================= */}

      {error && (
        <div className="registration-message error">
          {error}
        </div>
      )}


      {/* ================= TABLE ================= */}

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

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >
                    Loading registrations...
                  </td>

                </tr>

              ) : filteredRegistrations.length > 0 ? (

                filteredRegistrations.map(
                  (registration) => {

                    const userName =
                      registration.userId
                        ? `${registration.userId.firstName || ""} ${
                            registration.userId.lastName || ""
                          }`
                        : "Unknown User";

                    const email =
                      registration.userId?.email ||
                      "N/A";

                    const eventTitle =
                      registration.eventId?.title ||
                      "Unknown Event";

                    const eventDate =
                      registration.eventId?.date
                        ? new Date(
                            registration.eventId.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A";


                    return (
                      <tr
                        key={registration._id}
                      >

                        <td>
                          #{registration._id.slice(-6)}
                        </td>


                        <td>
                          {userName}
                        </td>


                        <td>
                          {email}
                        </td>


                        <td>
                          {eventTitle}
                        </td>


                        <td>
                          {eventDate}
                        </td>


                        <td>

                          <span
                            className={`registration-status ${getStatusClass(
                              registration.status
                            )}`}
                          >
                            {getStatusText(
                              registration.status
                            )}
                          </span>

                        </td>


                        <td>

                          <div className="registration-actions">

                            <button
                              className="registration-view-btn"
                              onClick={() =>
                                handleView(
                                  registration._id
                                )
                              }
                            >
                              View
                            </button>


                            {registration.status ===
                              "REGISTERED" && (

                              <button
                                className="registration-cancel-btn"
                                onClick={() =>
                                  handleCancel(
                                    registration._id
                                  )
                                }
                                disabled={actionLoading}
                              >
                                Cancel
                              </button>

                            )}

                          </div>

                        </td>

                      </tr>
                    );

                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >
                    No registrations found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ================= VIEW MODAL ================= */}

      {selectedRegistration && (

        <div className="registration-modal-overlay">

          <div className="registration-modal">

            <div className="registration-modal-header">

              <h2>
                Registration Details
              </h2>

              <button
                className="registration-close-btn"
                onClick={() =>
                  setSelectedRegistration(null)
                }
              >
                ×
              </button>

            </div>


            <div className="registration-details">

              <div>
                <strong>User</strong>

                <span>
                  {selectedRegistration.userId
                    ? `${selectedRegistration.userId.firstName || ""} ${
                        selectedRegistration.userId.lastName || ""
                      }`
                    : "N/A"}
                </span>
              </div>


              <div>
                <strong>Email</strong>

                <span>
                  {selectedRegistration.userId?.email ||
                    "N/A"}
                </span>
              </div>


              <div>
                <strong>Event</strong>

                <span>
                  {selectedRegistration.eventId?.title ||
                    "N/A"}
                </span>
              </div>


              <div>
                <strong>Status</strong>

                <span
                  className={`registration-status ${getStatusClass(
                    selectedRegistration.status
                  )}`}
                >
                  {getStatusText(
                    selectedRegistration.status
                  )}
                </span>
              </div>


              <div>
                <strong>Registered On</strong>

                <span>
                  {selectedRegistration.createdAt
                    ? new Date(
                        selectedRegistration.createdAt
                      ).toLocaleString("en-IN")
                    : "N/A"}
                </span>
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Registrations;