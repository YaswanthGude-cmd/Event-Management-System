import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrganizerDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const OrganizerDashboard = () => {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchOrganizerDashboard();
  }, []);


  const fetchOrganizerDashboard = async () => {

    try {

      const userRole = localStorage.getItem("userRole");
      const organizerId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!organizerId || !token) {
        navigate("/login");
        return;
      }


      // ==========================================
      // 1. GET EVENTS
      // ==========================================

      let eventUrl;

      if (userRole === "ADMIN") {

        // Admin can view all organizer events
        eventUrl =
          `${API_URL}/api/organizers/events`;

      } else {

        // Normal organizer can view only their own events
        eventUrl =
          `${API_URL}/api/organizers/${organizerId}/events`;

      }


      const eventResponse = await fetch(
        eventUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const eventData = await eventResponse.json();


      if (!eventResponse.ok) {

        setError(
          eventData.message || "Failed to fetch events"
        );

        return;
      }


      const organizerEvents =
        eventData.events || eventData;


      setEvents(organizerEvents);


      // ==========================================
      // 2. GET REGISTRATIONS FOR EACH EVENT
      // ==========================================

      let registrationCount = 0;

      const participantIds = new Set();


      const eventsWithParticipants =
        await Promise.all(

          organizerEvents.map(async (event) => {

            try {

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


              if (!response.ok) {

                console.error(
                  `Failed to fetch registrations for ${event.title}`
                );

                return {
                  ...event,
                  participantCount: 0,
                };

              }


              const registrations =
                data.registrations || [];


              // ==================================
              // ONLY ACTIVE REGISTRATIONS
              // ==================================

              const activeRegistrations =
                registrations.filter(
                  (registration) =>
                    registration.status === "REGISTERED"
                );


              // ==================================
              // TOTAL REGISTRATIONS
              // ==================================

              registrationCount +=
                activeRegistrations.length;


              // ==================================
              // UNIQUE PARTICIPANTS
              // ==================================

              activeRegistrations.forEach(
                (registration) => {

                  const userId =
                    registration.userId?._id ||
                    registration.userId;

                  if (userId) {

                    participantIds.add(
                      userId.toString()
                    );

                  }

                }
              );


              return {
                ...event,
                participantCount:
                  activeRegistrations.length,
              };

            } catch (error) {

              console.error(
                `Error fetching registrations for ${event.title}:`,
                error
              );

              return {
                ...event,
                participantCount: 0,
              };

            }

          })

        );


      // ==========================================
      // 3. SAVE CALCULATED DATA
      // ==========================================

      setEvents(eventsWithParticipants);

      setTotalRegistrations(
        registrationCount
      );

      setTotalParticipants(
        participantIds.size
      );


    } catch (error) {

      console.error(
        "Error fetching organizer dashboard:",
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
  // STATISTICS
  // ==========================================

  const totalEvents =
    events.length;


  const upcomingEvents =
    events.filter(
      (event) =>
        event.status === "UPCOMING"
    ).length;


  // ==========================================
  // USER ROLE
  // ==========================================

  const userRole =
    localStorage.getItem("userRole");


  return (

    <div className="organizer-dashboard">


      {/* ======================================
          HEADER
      ====================================== */}

      <div className="dashboard-header">

        <div>

          <p className="page-subtitle">
            ORGANIZER PANEL
          </p>


          <h1>
            Organizer Dashboard
          </h1>


          <p className="dashboard-subtitle">

            {userRole === "ADMIN"
              ? "Welcome back, Admin!"
              : "Welcome back, Organizer!"}

          </p>

        </div>


        <button
          className="create-event-btn"
          onClick={() =>
            navigate("/organizer/create-event")
          }
        >
          + Create Event
        </button>

      </div>


      {/* ======================================
          LOADING
      ====================================== */}

      {loading && (

        <p>
          Loading dashboard...
        </p>

      )}


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (

        <p style={{ color: "red" }}>
          {error}
        </p>

      )}


      {!loading && !error && (

        <>


          {/* ==================================
              STATISTICS
          ================================== */}

          <div className="dashboard-stats">


            {/* TOTAL EVENTS */}

            <div className="stat-card">

              <h3>
                Total Events
              </h3>


              <p className="stat-number">
                {totalEvents}
              </p>


              <span className="stat-description">

                {userRole === "ADMIN"
                  ? "Organizer events"
                  : "Events created"}

              </span>

            </div>


            {/* UPCOMING EVENTS */}

            <div className="stat-card">

              <h3>
                Upcoming Events
              </h3>


              <p className="stat-number">
                {upcomingEvents}
              </p>


              <span className="stat-description">
                Events scheduled
              </span>

            </div>


            {/* TOTAL PARTICIPANTS */}

            <div className="stat-card">

              <h3>
                Total Participants
              </h3>


              <p className="stat-number">
                {totalParticipants}
              </p>


              <span className="stat-description">
                Unique participants
              </span>

            </div>


            {/* TOTAL REGISTRATIONS */}

            <div className="stat-card">

              <h3>
                Registrations
              </h3>


              <p className="stat-number">
                {totalRegistrations}
              </p>


              <span className="stat-description">
                Active registrations
              </span>

            </div>


          </div>


          {/* ==================================
              RECENT EVENTS
          ================================== */}

          <div className="recent-events">


            <div className="recent-events-header">

              <div>

                <h2>
                  Recent Events
                </h2>


                <p>

                  {userRole === "ADMIN"
                    ? "Overview of organizer events."
                    : "Overview of your recently created events."}

                </p>

              </div>


              <button
                className="view-events-btn"
                onClick={() =>
                  navigate("/organizer/my-events")
                }
              >
                View All
              </button>

            </div>


            <div className="table-wrapper">


              {events.length === 0 ? (

                <p>
                  No events created yet.
                </p>

              ) : (

                <table className="dashboard-table">


                  <thead>

                    <tr>

                      <th>
                        Event Name
                      </th>

                      <th>
                        Date
                      </th>

                      <th>
                        Venue
                      </th>

                      <th>
                        Participants
                      </th>

                      <th>
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {events
                      .slice(0, 5)
                      .map((event) => (

                        <tr
                          key={event._id}
                        >


                          <td className="event-name">
                            {event.title}
                          </td>


                          <td>

                            {new Date(
                              event.date
                            ).toLocaleDateString()}

                          </td>


                          <td>
                            {event.venue}
                          </td>


                          <td>
                            {event.participantCount || 0}
                          </td>


                          <td>

                            <span className="event-status">
                              {event.status}
                            </span>

                          </td>


                        </tr>

                      ))}

                  </tbody>


                </table>

              )}

            </div>

          </div>


        </>

      )}

    </div>

  );

};


export default OrganizerDashboard;