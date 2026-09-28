import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyEvents.css";

const MyEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const organizerId = localStorage.getItem("userId");
      const userRole = localStorage.getItem("userRole");
      const token = localStorage.getItem("token");

      if (!organizerId || !token) {
        navigate("/login");
        return;
      }

      // ==========================================
      // GET EVENTS
      // ==========================================

      let eventUrl;

      if (userRole === "ADMIN") {
        // Admin can see all organizer events
        eventUrl =
          "http://localhost:5000/api/organizers/events";
      } else {
        // Normal organizer sees only their own events
        eventUrl =
          `http://localhost:5000/api/organizers/${organizerId}/events`;
      }

      const response = await fetch(
        eventUrl,
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
          data.message || "Failed to fetch events"
        );
        return;
      }

      setEvents(data.events || data);

    } catch (error) {

      console.error(
        "Error fetching events:",
        error
      );

      setError(
        "Unable to connect to server"
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // GET ACTUAL ORGANIZER ID OF EVENT
  // ==========================================

  const getEventOrganizerId = (event) => {

    // If organizerId is populated
    if (
      event.organizerId &&
      typeof event.organizerId === "object"
    ) {
      return event.organizerId._id;
    }

    // If organizerId is just an ID
    return event.organizerId;
  };


  // ==========================================
  // EDIT EVENT
  // ==========================================

  const handleEdit = (event) => {

    const eventOrganizerId =
      getEventOrganizerId(event);

    if (!eventOrganizerId) {
      alert(
        "Organizer information is missing for this event."
      );
      return;
    }

    navigate(
      `/organizer/edit-event?eventId=${event._id}&organizerId=${eventOrganizerId}`
    );
  };


  // ==========================================
  // CANCEL EVENT
  // ==========================================

  const handleDelete = async (event) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to cancel this event?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const loggedInUserId =
        localStorage.getItem("userId");

      const userRole =
        localStorage.getItem("userRole");

      const token =
        localStorage.getItem("token");


      // ========================================
      // DETERMINE ORGANIZER ID
      // ========================================

      let organizerId;

      if (userRole === "ADMIN") {

        // Admin must use the actual organizer
        // who owns this event
        organizerId =
          getEventOrganizerId(event);

      } else {

        // Normal organizer uses their own ID
        organizerId =
          loggedInUserId;

      }


      if (!organizerId) {

        alert(
          "Organizer information is missing for this event."
        );

        return;

      }


      const response = await fetch(
        `http://localhost:5000/api/organizers/${organizerId}/events/${event._id}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Failed to cancel event"
        );

        return;

      }


      alert(
        "Event cancelled successfully!"
      );


      fetchEvents();

    } catch (error) {

      console.error(
        "Error cancelling event:",
        error
      );

      alert(
        "Unable to connect to server"
      );

    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="my-events-page">

        <h1>My Events</h1>

        <p>
          Loading events...
        </p>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="my-events-page">

        <h1>My Events</h1>

        <p style={{ color: "red" }}>
          {error}
        </p>

      </div>

    );

  }


  const userRole =
    localStorage.getItem("userRole");


  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div className="my-events-page">


      {/* ======================================
          HEADER
      ====================================== */}

      <div className="my-events-header">

        <p className="page-subtitle">
          EVENT MANAGEMENT
        </p>


        <h1>
          My Events
        </h1>


        <p className="page-description">

          {userRole === "ADMIN"
            ? "View and manage events created by organizers."
            : "View and manage all the events you have created."}

        </p>

      </div>


      {/* ======================================
          EVENTS
      ====================================== */}

      <div className="events-container">


        {events.length === 0 ? (

          <p>
            No events created yet.
          </p>

        ) : (

          <div className="events-grid">


            {events.map((event) => (

              <div
                className="event-card"
                key={event._id}
              >


                {/* ==============================
                    EVENT HEADER
                ============================== */}

                <div className="event-card-header">

                  <h2>
                    {event.title}
                  </h2>


                  <span className="event-status">
                    {event.status}
                  </span>

                </div>


                {/* ==============================
                    EVENT DETAILS
                ============================== */}

                <div className="event-details">


                  <div className="event-detail">

                    <span className="detail-label">
                      Date
                    </span>


                    <span className="detail-value">

                      {new Date(
                        event.date
                      ).toLocaleDateString()}

                    </span>

                  </div>


                  <div className="event-detail">

                    <span className="detail-label">
                      Venue
                    </span>


                    <span className="detail-value">
                      {event.venue}
                    </span>

                  </div>


                  <div className="event-detail">

                    <span className="detail-label">
                      Capacity
                    </span>


                    <span className="detail-value">
                      {event.capacity}
                    </span>

                  </div>


                  {/* ============================
                      SHOW ORGANIZER TO ADMIN
                  ============================ */}

                  {userRole === "ADMIN" && (
                    <div className="event-detail">

                      <span className="detail-label">
                        Organizer
                      </span>


                      <span className="detail-value">

                        {event.organizerId &&
                        typeof event.organizerId === "object"
                          ? `${event.organizerId.firstName || ""} ${
                              event.organizerId.lastName || ""
                            }`
                          : "Unknown"}

                      </span>

                    </div>
                  )}


                </div>


                {/* ==============================
                    EVENT ACTIONS
                ============================== */}

                <div className="event-actions">


                  <button
                    className="edit-event-btn"
                    onClick={() =>
                      handleEdit(event)
                    }
                    disabled={
                      event.status === "CANCELLED"
                    }
                  >
                    Edit Event
                  </button>


                  <button
                    className="delete-event-btn"
                    onClick={() =>
                      handleDelete(event)
                    }
                    disabled={
                      event.status === "CANCELLED"
                    }
                  >

                    {event.status === "CANCELLED"
                      ? "Cancelled"
                      : "Cancel Event"}

                  </button>


                </div>


              </div>

            ))}


          </div>

        )}

      </div>

    </div>

  );

};
export default MyEvents;