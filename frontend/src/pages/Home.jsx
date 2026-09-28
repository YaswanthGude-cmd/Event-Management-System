import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view events.");
        setLoading(false);
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
        setError(data.message || "Failed to fetch events");
        return;
      }

      const allEvents = data.events || data;

      const upcomingEvents = allEvents
        .filter((event) => event.status === "UPCOMING")
        .sort(
          (a, b) =>
            new Date(a.date) - new Date(b.date)
        )
        .slice(0, 4);

      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="home-page">

      <Navbar />

      {/* ================= HERO ================= */}

      <section className="home-hero">

        <div className="hero-content">

          <span className="hero-label">
            ANITS EVENTS HUB
          </span>

          <h1>
            Discover. Register. <span>Participate.</span>
          </h1>

          <p>
            Discover upcoming campus events, register
            easily, and stay connected with activities
            happening across ANITS.
          </p>

          <div className="hero-actions">

            <Link
              to="/events"
              className="primary-button"
            >
              Explore Events
            </Link>

            <Link
              to="/my-registrations"
              className="secondary-button"
            >
              My Registrations
            </Link>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features-section">

        <div className="feature-card">
          <div className="feature-number">01</div>

          <div>
            <h3>Discover Events</h3>
            <p>
              Find technical, cultural, sports and
              workshop events happening on campus.
            </p>
          </div>
        </div>


        <div className="feature-card">
          <div className="feature-number">02</div>

          <div>
            <h3>Easy Registration</h3>
            <p>
              Register for events through a simple
              and convenient process.
            </p>
          </div>
        </div>


        <div className="feature-card">
          <div className="feature-number">03</div>

          <div>
            <h3>Track Activities</h3>
            <p>
              Manage your registrations and keep
              track of the events you joined.
            </p>
          </div>
        </div>

      </section>


      {/* ================= UPCOMING EVENTS ================= */}

      <section className="upcoming-section">

        <div className="section-header">

          <div>
            <span className="section-label">
              EVENTS
            </span>

            <h2>Upcoming Events</h2>

            <p>
              Explore the latest events happening
              across the campus.
            </p>
          </div>

          <Link
            to="/events"
            className="view-all-link"
          >
            View All Events →
          </Link>

        </div>


        {/* Loading */}

        {loading && (
          <div className="event-message">
            Loading upcoming events...
          </div>
        )}


        {/* Error */}

        {!loading && error && (
          <div className="event-message error">
            {error}
          </div>
        )}


        {/* No Events */}

        {!loading &&
          !error &&
          events.length === 0 && (
            <div className="event-message">
              No upcoming events available.
            </div>
          )}


        {/* Events */}

        {!loading &&
          !error &&
          events.length > 0 && (

            <div className="event-grid">

              {events.map((event) => (

                <Link
                  key={event._id}
                  to={`/events/${event._id}`}
                  className="event-card"
                >

                  <div className="event-card-top">

                    <span className="event-category">
                      {event.category || "General"}
                    </span>

                    <span className="event-date">
                      {formatDate(event.date)}
                    </span>

                  </div>


                  <div className="event-content">

                    <h3>
                      {event.title}
                    </h3>

                    <p className="event-description">
                      {event.description
                        ? event.description.length > 100
                          ? `${event.description.substring(
                              0,
                              100
                            )}...`
                          : event.description
                        : "No description available."}
                    </p>

                    <div className="event-location">
                      <span>Venue</span>
                      <strong>
                        {event.venue || "Not specified"}
                      </strong>
                    </div>

                  </div>


                  <div className="event-card-footer">
                    <span>
                      View Event
                    </span>

                    <span className="event-arrow">
                      →
                    </span>
                  </div>

                </Link>

              ))}

            </div>

          )}

      </section>


      {/* ================= ABOUT ================= */}

      <section className="about-section">

        <div className="about-content">

          <span className="section-label">
            ABOUT
          </span>

          <h2>
            One place for all campus events.
          </h2>

          <p>
            ANITS Events Hub provides students with
            a centralized platform to discover events,
            register for activities, and manage their
            participation. It simplifies event
            management for students and organizers.
          </p>

          <Link
            to="/events"
            className="about-button"
          >
            Browse Events
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div className="footer-main">

          <h2>
            ANITS Events Hub
          </h2>

          <p>
            A centralized platform for discovering
            and participating in campus events.
          </p>

        </div>


        <div className="footer-column">

          <h3>Navigation</h3>

          <Link to="/home">
            Home
          </Link>

          <Link to="/events">
            Events
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>


        <div className="footer-column">

          <h3>Platform</h3>

          <Link to="/my-registrations">
            My Registrations
          </Link>

          <Link to="/events">
            Browse Events
          </Link>

        </div>


        <div className="footer-column">

          <h3>Contact</h3>

          <p>
            ANITS, Visakhapatnam
          </p>

          <p>
            events@anits.edu.in
          </p>

        </div>

      </footer>


      <div className="footer-bottom">
        <p>
          © 2026 ANITS Events Hub. All rights reserved.
        </p>
      </div>

    </div>
  );
}

export default Home;