import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyRegistrations from "./pages/MyRegistrations";

import RoleRoute from "./components/RoleRoute";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageOrganizers from "./pages/admin/ManageOrganizers";
import ManageEvents from "./pages/admin/ManageEvents";
import Registrations from "./pages/admin/Registrations";
import Categories from "./pages/admin/Categories";
import AdminProfile from "./pages/admin/AdminProfile";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}
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
              element={<Registrations />}
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

        {/* We will add OrganizerLayout and Organizer pages here */}

      </Routes>

    </BrowserRouter>
  );
}

export default App;