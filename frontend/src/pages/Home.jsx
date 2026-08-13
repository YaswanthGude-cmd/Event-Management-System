import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <nav className="home-navbar">

        <div className="home-logo">
          <div className="logo-circle">A</div>

          <div>
            <h2>ANITS</h2>
            <p>Anil Neerukonda Institute of Technology & Sciences</p>
          </div>
        </div>

        <div className="home-nav-links">
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="home-auth-buttons">
          <button className="login-button">Login</button>
          <button className="register-button">Register</button>
        </div>

      </nav>

      {/* ================= HERO ================= */}
      <section className="home-hero" id="home">

        <div className="hero-content">

          <p className="hero-small-title">
            WELCOME TO
          </p>

          <h1>
            ANITS <span>Events Hub</span>
          </h1>

          <p className="hero-text">
            Your one-stop platform for discovering, registering and
            participating in exciting events across the campus.
          </p>

          <div className="hero-buttons">

            <button className="explore-button">
              Explore Events →
            </button>

            <button className="learn-button">
              Learn More
            </button>

          </div>

          <div className="hero-stats">

            <div>
              <h2>50+</h2>
              <p>Events</p>
            </div>

            <div>
              <h2>5000+</h2>
              <p>Students</p>
            </div>

            <div>
              <h2>100+</h2>
              <p>Achievements</p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features-section">

        <div className="feature">
          <div className="feature-icon">📅</div>

          <div>
            <h3>Discover Events</h3>
            <p>
              Find technical, cultural, sports and more events.
            </p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">✍️</div>

          <div>
            <h3>Easy Registration</h3>
            <p>
              Register for events quickly and securely.
            </p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">🔔</div>

          <div>
            <h3>Stay Updated</h3>
            <p>
              Get instant updates and reminders.
            </p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">🏆</div>

          <div>
            <h3>Participate & Win</h3>
            <p>
              Showcase your skills and win exciting prizes.
            </p>
          </div>
        </div>

      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section className="upcoming-section" id="events">

        <div className="section-title">

          <h2>Upcoming Events</h2>

          <a href="#events">
            View All Events →
          </a>

        </div>

        <div className="event-grid">

          <div className="event-card">

            <div className="event-image">
              CODE IGNITE
            </div>

            <div className="event-content">

              <span className="event-date">
                AUG 12
              </span>

              <h3>
                CodeIgnite 2K26
              </h3>

              <p>
                📍 CSE Seminar Hall
              </p>

              <span className="event-category">
                Technical
              </span>

            </div>
          </div>

          <div className="event-card">

            <div className="event-image">
              NRITYA 2K26
            </div>

            <div className="event-content">

              <span className="event-date">
                AUG 18
              </span>

              <h3>
                Nritya 2K26
              </h3>

              <p>
                📍 Main Auditorium
              </p>

              <span className="event-category cultural">
                Cultural
              </span>

            </div>
          </div>

          <div className="event-card">

            <div className="event-image">
              SPORTS FEST
            </div>

            <div className="event-content">

              <span className="event-date">
                AUG 24
              </span>

              <h3>
                Sports Fest 2K26
              </h3>

              <p>
                📍 ANITS Ground
              </p>

              <span className="event-category sports">
                Sports
              </span>

            </div>
          </div>

          <div className="event-card">

            <div className="event-image">
              TECH TALK
            </div>

            <div className="event-content">

              <span className="event-date">
                AUG 30
              </span>

              <h3>
                Tech Talk Series
              </h3>

              <p>
                📍 CSE Block
              </p>

              <span className="event-category workshop">
                Workshop
              </span>

            </div>
          </div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}
      <section className="about-section" id="about">

        <h2>About ANITS Events Hub</h2>

        <p>
          ANITS Events Hub helps students discover and participate
          in technical, cultural, sports and workshop events
          happening across the campus.
        </p>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer" id="contact">

        <div>
          <h2>ANITS Events Hub</h2>

          <p>
            Connecting students with exciting campus events.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <p>Home</p>
          <p>Events</p>
          <p>About</p>
        </div>

        <div>
          <h3>Contact</h3>

          <p>ANITS, Visakhapatnam</p>
          <p>events@anits.edu.in</p>
        </div>

      </footer>

    </div>
  );
}

export default Home;