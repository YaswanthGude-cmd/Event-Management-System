
import React, { useEffect, useState } from "react";
import "./Participants.css";

const API_URL = import.meta.env.VITE_API_URL;
const Participants = () => {

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchParticipants();
  }, []);


  const fetchParticipants = async () => {

    try {

      const loggedInUserId =
        localStorage.getItem("userId");

      const userRole =
        localStorage.getItem("userRole");

      const token =
        localStorage.getItem("token");


      if (!loggedInUserId || !token) {

        setError(
          "Please login again"
        );

        return;

      }


      // ==========================================
      // 1. GET EVENTS
      // ==========================================

      let eventsUrl;

      if (userRole === "ADMIN") {

        // Admin can view all organizer events
        eventsUrl =
          `${API_URL}/api/organizers/events`;

      } else {

        // Organizer can view only their own events
        eventsUrl =
          `${API_URL}/api/organizers/${loggedInUserId}/events`;

      }


      const eventsResponse = await fetch(
        eventsUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const eventsData =
        await eventsResponse.json();


      if (!eventsResponse.ok) {

        setError(
          eventsData.message ||
          "Failed to fetch events"
        );

        return;

      }


      const events =
        eventsData.events || eventsData;


      // ==========================================
      // 2. GET PARTICIPANTS FOR EACH EVENT
      // ==========================================

      let allParticipants = [];


      for (const event of events) {

        let organizerId;


        // ========================================
        // DETERMINE EVENT ORGANIZER
        // ========================================

        if (
          userRole === "ADMIN" &&
          event.organizerId &&
          typeof event.organizerId === "object"
        ) {

          // Admin uses the actual organizer
          // who owns this event
          organizerId =
            event.organizerId._id;

        } else {

          // Normal organizer uses their own ID
          organizerId =
            loggedInUserId;

        }


        if (!organizerId) {

          console.error(
            `Organizer ID missing for event: ${event.title}`
          );

          continue;

        }


        // ========================================
        // GET EVENT PARTICIPANTS
        // ========================================

        const response = await fetch(
          `${API_URL}/api/organizers/${organizerId}/events/${event._id}/participants`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const data =
          await response.json();


        if (response.ok) {

          const eventParticipants =
            data.participants || data;


          const participantsWithEvent =
            eventParticipants.map(
              (participant) => ({

                ...participant,

                eventName:
                  event.title,

              })
            );


          allParticipants = [
            ...allParticipants,
            ...participantsWithEvent,
          ];

        } else {

          console.error(
            `Failed to fetch participants for ${event.title}:`,
            data.message
          );

        }

      }


      setParticipants(
        allParticipants
      );


    } catch (error) {

      console.error(
        "Error fetching participants:",
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
  // MAIN UI
  // ==========================================

  return (

    <div className="participants-page">


      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="participants-header">


        <div>

          <h1>
            Participants
          </h1>


          <p>

            {localStorage.getItem("userRole") === "ADMIN"
              ? "View participants registered for organizer events."
              : "View participants registered for your events."}

          </p>

        </div>


        <div className="participant-count">

          <span>
            Total Participants
          </span>


          <strong>
            {participants.length}
          </strong>

        </div>


      </div>


      {/* ======================================
          LOADING
      ====================================== */}

      {loading && (

        <p>
          Loading participants...
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


      {/* ======================================
          PARTICIPANTS TABLE
      ====================================== */}

      {!loading && !error && (

        <div className="participants-table-container">


          <div className="table-header">

            <div>

              <h2>
                Registered Participants
              </h2>


              <p>

                {localStorage.getItem("userRole") === "ADMIN"
                  ? "List of users registered for organizer events."
                  : "List of users registered for your events."}

              </p>

            </div>

          </div>


          <div className="table-wrapper">


            {participants.length === 0 ? (

              <p>
                No participants registered yet.
              </p>

            ) : (

              <table className="participants-table">


                <thead>

                  <tr>

                    <th>
                      Participant
                    </th>

                    <th>
                      Email Address
                    </th>

                    <th>
                      Event
                    </th>

                  </tr>

                </thead>


                <tbody>


                  {participants.map(
                    (participant, index) => {

                      const user =
                        participant.userId || {};


                      const firstName =
                        user.firstName ||
                        participant.firstName ||
                        "";


                      const lastName =
                        user.lastName ||
                        participant.lastName ||
                        "";


                      const name =
                        `${firstName} ${lastName}`.trim() ||
                        participant.name ||
                        "Unknown";


                      const email =
                        user.email ||
                        participant.email ||
                        "N/A";


                      return (

                        <tr
                          key={
                            participant._id ||
                            participant.id ||
                            index
                          }
                        >


                          {/* PARTICIPANT */}

                          <td>

                            <div className="participant-info">


                              <div className="participant-avatar">

                                {name
                                  .charAt(0)
                                  .toUpperCase()}

                              </div>


                              <span className="participant-name">

                                {name}

                              </span>


                            </div>

                          </td>


                          {/* EMAIL */}

                          <td className="participant-email">

                            {email}

                          </td>


                          {/* EVENT */}

                          <td>

                            <span className="event-badge">

                              {participant.eventName}

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
export default Participants;