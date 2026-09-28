
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./EditEvent.css";

const EditEvent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const eventId = searchParams.get("eventId");
  const selectedOrganizerId = searchParams.get("organizerId");

  const [event, setEvent] = useState({
    name: "",
    category: "",
    date: "",
    time: "",
    venue: "",
    capacity: "",
    registrationDeadline: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");


  // ==========================================
  // FETCH EXISTING EVENT
  // ==========================================

  useEffect(() => {
    fetchEvent();
  }, []);


  const fetchEvent = async () => {

    try {

      const loggedInUserId =
        localStorage.getItem("userId");

      const userRole =
        localStorage.getItem("userRole");

      const token =
        localStorage.getItem("token");


      if (!loggedInUserId || !token) {
        navigate("/login");
        return;
      }


      if (!eventId) {

        setError(
          "Event ID is missing"
        );

        setLoading(false);

        return;
      }


      // ========================================
      // DETERMINE ORGANIZER ID
      // ========================================

      let organizerId;

      if (
        userRole === "ADMIN" &&
        selectedOrganizerId
      ) {

        // Admin uses the actual organizer
        // who owns the event
        organizerId =
          selectedOrganizerId;

      } else {

        // Normal organizer uses their own ID
        organizerId =
          loggedInUserId;

      }


      if (!organizerId) {

        setError(
          "Organizer ID is missing"
        );

        setLoading(false);

        return;
      }


      // ========================================
      // GET EVENT
      // ========================================

      const response = await fetch(
        `http://localhost:5000/api/organizers/${organizerId}/events/${eventId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Failed to fetch event"
        );

        return;
      }


      const eventData =
        data.event || data;


      // ========================================
      // SET EVENT DATA
      // ========================================

      setEvent({

        name:
          eventData.title || "",

        category:
          eventData.category || "",

        date:
          eventData.date
            ? eventData.date.substring(0, 10)
            : "",

        time:
          eventData.time || "",

        venue:
          eventData.venue || "",

        capacity:
          eventData.capacity || "",

        registrationDeadline:
          eventData.registrationDeadline
            ? eventData.registrationDeadline.substring(0, 10)
            : "",

        description:
          eventData.description || "",

      });


    } catch (error) {

      console.error(
        "Error fetching event:",
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
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    setEvent({
      ...event,
      [e.target.name]:
        e.target.value,
    });

  };


  // ==========================================
  // UPDATE EVENT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setUpdating(true);


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

      if (
        userRole === "ADMIN" &&
        selectedOrganizerId
      ) {

        organizerId =
          selectedOrganizerId;

      } else {

        organizerId =
          loggedInUserId;

      }


      if (!organizerId) {

        setError(
          "Organizer ID is missing"
        );

        setUpdating(false);

        return;
      }


      // ========================================
      // PUT REQUEST
      // ========================================

      const response = await fetch(
        `http://localhost:5000/api/organizers/${organizerId}/events/${eventId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({

            title:
              event.name,

            category:
              event.category,

            date:
              event.date,

            time:
              event.time,

            venue:
              event.venue,

            capacity:
              Number(event.capacity),

            registrationDeadline:
              event.registrationDeadline,

            description:
              event.description,

          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Failed to update event"
        );

        return;
      }


      alert(
        "Event updated successfully!"
      );


      navigate(
        "/organizer/my-events"
      );


    } catch (error) {

      console.error(
        "Error updating event:",
        error
      );

      setError(
        "Unable to connect to server"
      );

    } finally {

      setUpdating(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="edit-event-page">

        <h1>
          Edit Event
        </h1>

        <p>
          Loading event...
        </p>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error && !event.name) {

    return (

      <div className="edit-event-page">

        <h1>
          Edit Event
        </h1>

        <p style={{ color: "red" }}>
          {error}
        </p>

      </div>

    );

  }


  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div className="edit-event-page">


      {/* ======================================
          HEADER
      ====================================== */}

      <div className="edit-event-header">

        <p className="page-subtitle">
          EVENT MANAGEMENT
        </p>


        <h1>
          Edit Event
        </h1>


        <p className="page-description">

          Update the details of your existing
          event.

        </p>

      </div>


      {/* ======================================
          FORM
      ====================================== */}

      <form
        className="edit-event-form"
        onSubmit={handleSubmit}
      >


        <div className="form-section-title">

          <h2>
            Event Details
          </h2>

          <p>
            Modify the information below and
            save your changes.
          </p>

        </div>


        {/* ====================================
            EVENT NAME
        ==================================== */}

        <div className="form-group">

          <label htmlFor="name">

            Event Name{" "}

            <span>*</span>

          </label>


          <input
            id="name"
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />

        </div>


        {/* ====================================
            CATEGORY
        ==================================== */}

        <div className="form-group">

          <label htmlFor="category">

            Category{" "}

            <span>*</span>

          </label>


          <input
            id="category"
            type="text"
            name="category"
            value={event.category}
            onChange={handleChange}
            placeholder="Example: Technical, Workshop, Cultural"
            required
          />

        </div>


        {/* ====================================
            DATE + TIME
        ==================================== */}

        <div className="form-row">


          <div className="form-group">

            <label htmlFor="date">

              Event Date{" "}

              <span>*</span>

            </label>


            <input
              id="date"
              type="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="time">

              Event Time{" "}

              <span>*</span>

            </label>


            <input
              id="time"
              type="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              required
            />

          </div>


        </div>


        {/* ====================================
            VENUE
        ==================================== */}

        <div className="form-group">

          <label htmlFor="venue">

            Venue{" "}

            <span>*</span>

          </label>


          <input
            id="venue"
            type="text"
            name="venue"
            value={event.venue}
            onChange={handleChange}
            placeholder="Enter event venue"
            required
          />

        </div>


        {/* ====================================
            CAPACITY
        ==================================== */}

        <div className="form-group">

          <label htmlFor="capacity">

            Capacity{" "}

            <span>*</span>

          </label>


          <input
            id="capacity"
            type="number"
            name="capacity"
            value={event.capacity}
            onChange={handleChange}
            placeholder="Enter maximum participants"
            min="1"
            required
          />

        </div>


        {/* ====================================
            REGISTRATION DEADLINE
        ==================================== */}

        <div className="form-group">

          <label htmlFor="registrationDeadline">

            Registration Deadline{" "}

            <span>*</span>

          </label>


          <input
            id="registrationDeadline"
            type="date"
            name="registrationDeadline"
            value={
              event.registrationDeadline
            }
            onChange={handleChange}
            required
          />

        </div>


        {/* ====================================
            DESCRIPTION
        ==================================== */}

        <div className="form-group">

          <label htmlFor="description">

            Description{" "}

            <span>*</span>

          </label>


          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Enter event description"
            rows="6"
            required
          />

        </div>


        {/* ====================================
            ERROR
        ==================================== */}

        {error && (

          <p style={{ color: "red" }}>
            {error}
          </p>

        )}


        {/* ====================================
            SUBMIT
        ==================================== */}

        <div className="edit-event-actions">

          <button
            type="submit"
            className="update-event-btn"
            disabled={updating}
          >

            {updating
              ? "Updating..."
              : "Update Event"}

          </button>

        </div>


      </form>

    </div>

  );

};
export default EditEvent;