import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Events.css";

function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const events = [
    {
      id: 1,
      title: "Tech Fest 2026",
      category: "Technical",
      date: "August 20, 2026",
      time: "10:00 AM - 4:00 PM",
      venue: "ANITS Auditorium",
      description:
        "A technical fest featuring coding competitions, project exhibitions, quizzes and innovative ideas.",
      icon: "💻",
    },
    {
      id: 2,
      title: "Hackathon 2026",
      category: "Technical",
      date: "August 25, 2026",
      time: "9:00 AM - 6:00 PM",
      venue: "Computer Science Block",
      description:
        "Participate in an exciting hackathon and build innovative solutions for real-world problems.",
      icon: "🚀",
    },
    {
      id: 3,
      title: "Cultural Fest",
      category: "Cultural",
      date: "September 5, 2026",
      time: "10:00 AM - 7:00 PM",
      venue: "College Open Ground",
      description:
        "Enjoy music, dance, drama and other cultural performances by ANITS students.",
      icon: "🎭",
    },
    {
      id: 4,
      title: "Sports Meet",
      category: "Sports",
      date: "September 12, 2026",
      time: "8:00 AM - 5:00 PM",
      venue: "ANITS Sports Ground",
      description:
        "Take part in exciting sports activities including cricket, volleyball, badminton and athletics.",
      icon: "🏆",
    },
    {
      id: 5,
      title: "AI & ML Workshop",
      category: "Workshop",
      date: "September 18, 2026",
      time: "10:00 AM - 2:00 PM",
      venue: "Seminar Hall",
      description:
        "Learn the fundamentals of Artificial Intelligence and Machine Learning from industry experts.",
      icon: "🤖",
    },
    {
      id: 6,
      title: "Web Development Workshop",
      category: "Workshop",
      date: "September 25, 2026",
      time: "10:00 AM - 3:00 PM",
      venue: "IT Laboratory",
      description:
        "Learn modern web development using HTML, CSS, JavaScript and React.",
      icon: "🌐",
    },
  ];

  const categories = [
    "All",
    "Technical",
    "Cultural",
    "Sports",
    "Workshop",
  ];

  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.description.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleRegister = (eventTitle) => {
    alert(`Registration selected for ${eventTitle}`);
  };

  return (
    <div className="events-page">

      {/* NAVBAR */}
      <nav className="events-navbar">
        <div className="events-logo">
          <div className="events-logo-circle">A</div>

          <div>
            <h2>ANITS</h2>
            <span>
              Anil Neerukonda Institute of Technology & Sciences
            </span>
          </div>
        </div>

        <div className="events-nav-links">
          <Link to="/">Home</Link>

          <Link to="/events" className="active">
            Events
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/profile">
            Profile
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <section className="events-header">
        <p className="small-heading">
          ANITS EVENT MANAGEMENT SYSTEM
        </p>

        <h1>Explore Events</h1>

        <p>
          Discover upcoming events, workshops, competitions and
          activities happening at ANITS.
        </p>
      </section>

      {/* SEARCH + FILTER */}
      <section className="event-controls">

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-filter">
          <label htmlFor="category">
            Category:
          </label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

      </section>

      {/* EVENTS */}
      <section className="events-container">

        <div className="events-title-row">
          <h2>Upcoming Events</h2>

          <span>
            {filteredEvents.length} Event
            {filteredEvents.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="events-grid">

            {filteredEvents.map((event) => (
              <div
                className="event-card"
                key={event.id}
              >

                {/* EVENT ICON */}
                <div className="event-card-top">

                  <div className="event-icon">
                    {event.icon}
                  </div>

                  <span className="event-category">
                    {event.category}
                  </span>

                </div>

                {/* EVENT DETAILS */}
                <div className="event-card-body">

                  <h3>{event.title}</h3>

                  <p className="event-description">
                    {event.description}
                  </p>

                  <div className="event-info">

                    <div>
                      <strong>📅 Date</strong>
                      <span>{event.date}</span>
                    </div>

                    <div>
                      <strong>⏰ Time</strong>
                      <span>{event.time}</span>
                    </div>

                    <div>
                      <strong>📍 Venue</strong>
                      <span>{event.venue}</span>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="register-btn"
                    onClick={() =>
                      handleRegister(event.title)
                    }
                  >
                    Register Now →
                  </button>

                </div>

              </div>
            ))}

          </div>
        ) : (
          <div className="no-events">

            <div>🔎</div>

            <h3>No Events Found</h3>

            <p>
              Try changing the search text or category.
            </p>

          </div>
        )}

      </section>

      {/* FOOTER */}
      <footer className="events-footer">

        <h3>ANITS Event Management System</h3>

        <p>
          Manage and discover college events easily.
        </p>

        <p className="copyright">
          © 2026 ANITS. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default Events;