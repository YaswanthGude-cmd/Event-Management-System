import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyRegistrations from "./pages/MyRegistrations";

// Role Protection
import RoleRoute from "./components/RoleRoute";

// Admin Layout
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageOrganizers from "./pages/admin/ManageOrganizers";
import ManageEvents from "./pages/admin/ManageEvents";
import AdminRegistrations from "./pages/admin/Registrations";
import Categories from "./pages/admin/Categories";
import AdminProfile from "./pages/admin/AdminProfile";

// Organizer Layout
import OrganizerLayout from "./layouts/OrganizerLayout";

// Organizer Pages
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import CreateEvent from "./pages/organizer/CreateEvent";
import EditEvent from "./pages/organizer/EditEvent";
import MyEvents from "./pages/organizer/MyEvents";
import OrganizerProfile from "./pages/organizer/OrganizerProfile";
import Participants from "./pages/organizer/Participants";
import OrganizerRegistrations from "./pages/organizer/Registrations";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= AUTHENTICATION ================= */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* ================= USER ROUTES ================= */}

        <Route element={<RoleRoute allowedRole="USER" />}>
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/my-registrations"
            element={<MyRegistrations />}
          />
        </Route>


        {/* ================= ADMIN ROUTES ================= */}

        <Route element={<RoleRoute allowedRole="ADMIN" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="users"
              element={<ManageUsers />}
            />

            <Route
              path="organizers"
              element={<ManageOrganizers />}
            />

            <Route
              path="events"
              element={<ManageEvents />}
            />

            <Route
              path="registrations"
              element={<AdminRegistrations />}
            />

            <Route
              path="categories"
              element={<Categories />}
            />

            <Route
              path="profile"
              element={<AdminProfile />}
            />
          </Route>
        </Route>


        {/* ================= ORGANIZER ROUTES ================= */}

        <Route element={<RoleRoute allowedRole="ORGANIZER" />}>
          <Route path="/organizer" element={<OrganizerLayout />}>

            <Route
              index
              element={<OrganizerDashboard />}
            />

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
              element={<OrganizerRegistrations />}
            />

            <Route
              path="profile"
              element={<OrganizerProfile />}
            />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;