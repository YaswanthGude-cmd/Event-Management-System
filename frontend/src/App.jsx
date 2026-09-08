import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";

// Organizer Layout
import OrganizerLayout from "./layouts/OrganizerLayout";

// Organizer Pages
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import CreateEvent from "./pages/organizer/CreateEvent";
import EditEvent from "./pages/organizer/EditEvent";
import MyEvents from "./pages/organizer/MyEvents";
import OrganizerProfile from "./pages/organizer/OrganizerProfile";
import Participants from "./pages/organizer/Participants";
import Registrations from "./pages/organizer/Registrations";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= USER PAGES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/events" element={<Events />} />


        {/* ================= ORGANIZER PAGES ================= */}

        <Route
          path="/organizer"
          element={<OrganizerLayout />}
        >

          <Route
            path="dashboard"
            element={<OrganizerDashboard />}
          />

          <Route
            path="create-event"
            element={<CreateEvent />}
          />

          <Route
            path="edit-event"
            element={<EditEvent />}
          />

          <Route
            path="my-events"
            element={<MyEvents />}
          />

          <Route
            path="participants"
            element={<Participants />}
          />

          <Route
            path="registrations"
            element={<Registrations />}
          />

          <Route
            path="profile"
            element={<OrganizerProfile />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;