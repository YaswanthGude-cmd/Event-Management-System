import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Events.css";

const API_URL = import.meta.env.VITE_API_URL;

function Events() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ================= FETCH EVENTS =================

  useEffect(() => {
    fetchEvents();
  }, []);


  const fetchEvents = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }


      const response = await fetch(
        `${API_URL}/api/events`,
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
          data.message ||
          "Failed to fetch events"
        );

        return;
      }


      setEvents(data.events || []);


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


  // ================= CATEGORIES =================

  const categories = [
    "All",
    ...new Set(
      events.map(
        (event) => event.category
      )
    ),
  ];


  // ================= FILTER =================

  const filteredEvents = events.filter(
    (event) => {

      const searchText =
        search.toLowerCase();


      const matchesSearch =
        event.title
          ?.toLowerCase()
          .includes(searchText) ||

        event.description
          ?.toLowerCase()
          .includes(searchText) ||

        event.venue
          ?.toLowerCase()
          .includes(searchText);


      const matchesCategory =
        category === "All" ||
        event.category === category;


      return (
        matchesSearch &&
        matchesCategory
      );

    }
  );


  // ================= EVENT CLICK =================

  const handleRegister = (eventId) => {

    navigate(
      `/events/${eventId}`
    );

  };


  // ================= FORMAT DATE =================

  const formatDate = (date) => {

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  };


  return (
    <div className="events-page">

      {/* ================= NAVBAR ================= */}

      <Navbar />


      {/* ================= HEADER ================= */}

      <section className="events-header">

        <p className="small-heading">
          ANITS EVENT MANAGEMENT SYSTEM
        </p>

        <h1>
          Explore Events
        </h1>

        <p>
          Discover upcoming events, workshops,
          competitions and activities happening
          at ANITS.
        </p>

      </section>


      {/* ================= SEARCH + FILTER ================= */}

      <section className="event-controls">

        <div className="search-box">

          <span>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="category-filter">

          <label htmlFor="category">
            Category:
          </label>

          <select
            id="category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            {categories.map(
              (item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              )
            )}

          </select>

        </div>

      </section>


      {/* ================= EVENTS ================= */}

      <section className="events-container">

        <div className="events-title-row">

          <h2>
            Upcoming Events
          </h2>

          {!loading && !error && (
            <span>
              {filteredEvents.length} Event
              {filteredEvents.length !== 1
                ? "s"
                : ""}
            </span>
          )}

        </div>


        {/* LOADING */}

        {loading && (

          <div className="no-events">

            <h3>
              Loading Events...
            </h3>

            <p>
              Please wait while we fetch
              the latest events.
            </p>

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="no-events">

            <h3>
              Unable to Load Events
            </h3>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="register-btn"
              onClick={fetchEvents}
            >
              Try Again
            </button>

          </div>

        )}


        {/* EVENTS */}

        {!loading &&
          !error &&
          filteredEvents.length > 0 && (

            <div className="events-grid">

              {filteredEvents.map(
                (event) => (

                  <div
                    className="event-card"
                    key={event._id}
                  >

                    {/* EVENT ICON */}

                    <div className="event-card-top">

                      <div className="event-icon">
                        📅
                      </div>

                      <span className="event-category">
                        {event.category}
                      </span>

                    </div>


                    {/* EVENT DETAILS */}

                    <div className="event-card-body">

                      <h3>
                        {event.title}
                      </h3>


                      <p className="event-description">
                        {event.description}
                      </p>


                      <div className="event-info">

                        <div>

                          <strong>
                            📅 Date
                          </strong>

                          <span>
                            {formatDate(
                              event.date
                            )}
                          </span>

                        </div>


                        <div>

                          <strong>
                            ⏰ Time
                          </strong>

                          <span>
                            {event.time}
                          </span>

                        </div>


                        <div>

                          <strong>
                            📍 Venue
                          </strong>

                          <span>
                            {event.venue}
                          </span>

                        </div>

                      </div>


                      <button
                        type="button"
                        className="register-btn"
                        onClick={() =>
                          handleRegister(
                            event._id
                          )
                        }
                      >
                        Register Now →
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}


        {/* NO EVENTS */}

        {!loading &&
          !error &&
          filteredEvents.length === 0 && (

            <div className="no-events">

              <div>
                🔎
              </div>

              <h3>
                No Events Found
              </h3>

              <p>
                Try changing the search
                text or category.
              </p>

            </div>

          )}

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="events-footer">

        <h3>
          ANITS Event Management System
        </h3>

        <p>
          Manage and discover college
          events easily.
        </p>

        <p className="copyright">
          © 2026 ANITS. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default Events;
