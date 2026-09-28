import React, { useEffect, useState } from "react";
import "./Registrations.css";

const API_URL = import.meta.env.VITE_API_URL;
const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const userRole = localStorage.getItem("userRole");
      const token = localStorage.getItem("token");

      if (!userId || !token || !userRole) {
        setError("Please login again");
        return;
      }

      // Get events
      let eventsUrl;

      if (userRole === "ADMIN") {
        // Admin can see registrations for all organizer events
        eventsUrl =
          `${API_URL}/api/organizers/events`;
      } else {
        // Normal organizer can see only their own events
        eventsUrl =
          `${API_URL}/api/organizers/${userId}/events`;
      }

      const eventsResponse = await fetch(eventsUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const eventsData = await eventsResponse.json();

      if (!eventsResponse.ok) {
        setError(
          eventsData.message || "Failed to fetch events"
        );
        return;
      }

      const events = eventsData.events || eventsData;

      let allRegistrations = [];

      // Get registrations for every event
      for (const event of events) {
        const response = await fetch(
          `${API_URL}/api/registrations/event/${event._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          const eventRegistrations =
            data.registrations || data;

          const registrationsWithEvent =
            eventRegistrations.map((registration) => ({
              ...registration,
              eventName: event.title,
            }));

          allRegistrations = [
            ...allRegistrations,
            ...registrationsWithEvent,
          ];
        }
      }

      setRegistrations(allRegistrations);
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

  const confirmedCount = registrations.filter(
    (registration) =>
      registration.status === "REGISTERED"
  ).length;

  const pendingCount = registrations.filter(
    (registration) =>
      registration.status === "PENDING"
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

            <strong>
              {registrations.length}
            </strong>
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

      {/* Loading */}
      {loading && (
        <p>Loading registrations...</p>
      )}

      {/* Error */}
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* Registrations Table */}
      {!loading && !error && (
        <div className="registrations-table-container">

          <div className="table-header">

            <div>
              <h2>All Registrations</h2>

              <p>
                Track participant registrations and
                their current status.
              </p>
            </div>

          </div>

          <div className="table-wrapper">

            {registrations.length === 0 ? (
              <p>No registrations found.</p>
            ) : (
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

                  {registrations.map(
                    (registration, index) => {

                      const user =
                        registration.userId || {};

                      const firstName =
                        user.firstName ||
                        registration.firstName ||
                        "";

                      const lastName =
                        user.lastName ||
                        registration.lastName ||
                        "";

                      const participant =
                        `${firstName} ${lastName}`.trim() ||
                        registration.name ||
                        "Unknown";

                      const status =
                        registration.status ||
                        "REGISTERED";

                      return (
                        <tr
                          key={
                            registration._id ||
                            registration.id ||
                            index
                          }
                        >

                          {/* Participant */}
                          <td>
                            <div className="registration-participant">

                              <div className="participant-avatar">
                                {participant
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <span>
                                {participant}
                              </span>

                            </div>
                          </td>

                          {/* Event */}
                          <td>
                            <span className="registration-event">
                              {registration.eventName}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="registration-date">
                            {registration.createdAt
                              ? new Date(
                                  registration.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>

                          {/* Status */}
                          <td>
                            <span
                              className={`registration-status ${
                                status.toLowerCase()
                              }`}
                            >
                              {status === "REGISTERED"
                                ? "Confirmed"
                                : status}
                            </span>
                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default Registrations;