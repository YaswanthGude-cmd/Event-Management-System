import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./EventDetails.css";

const API_URL = import.meta.env.VITE_API_URL;

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [registration, setRegistration] = useState(null);

  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        navigate("/login");
        return;
      }

      // Fetch event
      const eventResponse = await fetch(
        `${API_URL}/api/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const eventData = await eventResponse.json();

      if (!eventResponse.ok) {
        setError(eventData.message || "Failed to fetch event");
        return;
      }

      setEvent(eventData.event || eventData);

      // Check whether current user is already registered
      const registrationResponse = await fetch(
        `${API_URL}/api/registrations/check/${userId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (registrationResponse.ok) {
        const registrationData = await registrationResponse.json();

        if (registrationData.registration) {
          setRegistration(registrationData.registration);
        } else if (registrationData.registered) {
          setRegistration({
            status: "REGISTERED",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        navigate("/login");
        return;
      }

      setRegistering(true);

      const response = await fetch(
        `${API_URL}/api/registrations/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            eventId: id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to register for event");
        return;
      }

      alert("Successfully registered for the event!");

      setRegistration({
        status: "REGISTERED",
      });

      // Update available seats locally
      setEvent((prev) => ({
        ...prev,
        registeredCount: (prev.registeredCount || 0) + 1,
      }));
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Unable to connect to server");
    } finally {
      setRegistering(false);
    }
  };

  const handleCancel = async () => {
    if (!registration?._id) {
      navigate("/my-registrations");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(
        `${API_URL}/api/registrations/${registration._id}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to cancel registration");
        return;
      }

      setRegistration((prev) => ({
        ...prev,
        status: "CANCELLED",
      }));

      alert("Registration cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling registration:", error);
      alert("Unable to connect to server");
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusText = () => {
    if (!event) return "";

    if (event.status === "COMPLETED") return "Completed";
    if (event.status === "CANCELLED") return "Cancelled";

    if (
      event.registrationDeadline &&
      new Date(event.registrationDeadline) < new Date()
    ) {
      return "Registration Closed";
    }

    if (event.status === "ONGOING") return "Ongoing";

    return "Registration Open";
  };

  const isRegistrationClosed =
    event?.status === "COMPLETED" ||
    event?.status === "CANCELLED" ||
    (event?.registrationDeadline &&
      new Date(event.registrationDeadline) < new Date());

  if (loading) {
    return (
      <div>
        <Navbar />

        <div className="event-details-message">
          <h2>Loading event...</h2>
          <p>Please wait while we fetch the event details.</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div>
        <Navbar />

        <div className="event-details-message">
          <h2>Unable to Load Event</h2>
          <p>{error || "Event not found."}</p>

          <Link to="/events" className="back-events-btn">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details-page">
      <Navbar />

      <main className="event-details-container">
        <Link to="/events" className="back-events-link">
          ← Back to Events
        </Link>

        <section className="event-details-card">
          <div className="event-details-header">
            <div>
              <span className="event-details-category">
                {event.category || "General"}
              </span>

              <h1>{event.title}</h1>

              <span
                className={`event-details-status ${event.status?.toLowerCase()}`}
              >
                {getStatusText()}
              </span>
            </div>
          </div>

          <div className="event-details-content">
            <div className="event-details-description">
              <h2>About This Event</h2>

              <p>
                {event.description || "No description available."}
              </p>
            </div>

            <div className="event-details-info">
              <div className="event-info-item">
                <span className="event-info-icon">📅</span>

                <div>
                  <span>Date</span>
                  <strong>{formatDate(event.date)}</strong>
                </div>
              </div>

              <div className="event-info-item">
                <span className="event-info-icon">⏰</span>

                <div>
                  <span>Time</span>
                  <strong>{event.time || "N/A"}</strong>
                </div>
              </div>

              <div className="event-info-item">
                <span className="event-info-icon">📍</span>

                <div>
                  <span>Venue</span>
                  <strong>{event.venue || "N/A"}</strong>
                </div>
              </div>

              <div className="event-info-item">
                <span className="event-info-icon">👥</span>

                <div>
                  <span>Capacity</span>
                  <strong>{event.capacity || "N/A"} participants</strong>
                </div>
              </div>

              <div className="event-info-item">
                <span className="event-info-icon">⏳</span>

                <div>
                  <span>Registration Deadline</span>
                  <strong>
                    {formatDate(event.registrationDeadline)}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="event-details-organizer">
            <h2>Organizer</h2>

            <div className="organizer-info">
              <div className="organizer-avatar">
                {event.organizerId?.firstName?.charAt(0) || "O"}
              </div>

              <div>
                <strong>
                  {event.organizerId?.firstName || ""}{" "}
                  {event.organizerId?.lastName || ""}
                </strong>

                <span>
                  {event.organizerId?.email || "Organizer"}
                </span>
              </div>
            </div>
          </div>

          <div className="event-details-actions">
            {registration?.status === "REGISTERED" ? (
              <>
                <div className="registered-message">
                  ✓ You are registered for this event
                </div>

                {!isRegistrationClosed && (
                  <button
                    className="cancel-event-btn"
                    onClick={handleCancel}
                  >
                    Cancel Registration
                  </button>
                )}
              </>
            ) : registration?.status === "CANCELLED" ? (
              <>
                {isRegistrationClosed ? (
                  <div className="closed-message">
                    Registration is closed for this event.
                  </div>
                ) : (
                  <button
                    className="register-event-btn"
                    onClick={handleRegister}
                    disabled={registering}
                  >
                    {registering ? "Registering..." : "Register Now"}
                  </button>
                )}
              </>
            ) : isRegistrationClosed ? (
              <div className="closed-message">
                Registration is closed for this event.
              </div>
            ) : (
              <button
                className="register-event-btn"
                onClick={handleRegister}
                disabled={registering}
              >
                {registering ? "Registering..." : "Register Now"}
              </button>
            )}

            <Link to="/my-registrations" className="my-registrations-btn">
              My Registrations
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EventDetails;