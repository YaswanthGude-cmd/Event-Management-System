import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AdminSidebar.css";

const AdminSidebar = () => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);


  // =========================
  // Logout
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };


  // =========================
  // Close Sidebar
  // =========================

  const handleNavigation = () => {
    setIsOpen(false);
  };


  // =========================
  // Switch Module
  // =========================

  const switchToUser = () => {
    setIsOpen(false);
    navigate("/home");
  };


  const switchToOrganizer = () => {
    setIsOpen(false);
    navigate("/organizer");
  };


  return (
    <>
      {/* =========================
          Mobile Menu Button
      ========================= */}

      <button
        className="admin-menu-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open admin menu"
      >
        ☰
      </button>


      {/* =========================
          Mobile Overlay
      ========================= */}

      {isOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}


      {/* =========================
          Sidebar
      ========================= */}

      <aside
        className={`admin-sidebar ${
          isOpen ? "open" : ""
        }`}
      >

        {/* =========================
            Sidebar Header
        ========================= */}

        <div className="admin-sidebar-header">

          <h2>Admin Panel</h2>

          <button
            className="admin-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close admin menu"
          >
            ×
          </button>

        </div>


        {/* =========================
            Navigation
        ========================= */}

        <nav className="admin-sidebar-nav">

          <NavLink
            to="/admin"
            end
            onClick={handleNavigation}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span>Dashboard</span>
          </NavLink>


          <NavLink
            to="/admin/users"
            onClick={handleNavigation}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span>Users</span>
          </NavLink>


          <NavLink
            to="/admin/organizers"
            onClick={handleNavigation}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span>Organizers</span>
          </NavLink>


          <NavLink
            to="/admin/events"
            onClick={handleNavigation}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span>Events</span>
          </NavLink>


          <NavLink
            to="/admin/registrations"
            onClick={handleNavigation}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span>Registrations</span>
          </NavLink>


          {/* =========================
              Switch Module
          ========================= */}

          <div className="admin-module-section">

            <p className="admin-section-title">
              Switch Module
            </p>


            <button
              className="admin-module-btn"
              onClick={switchToUser}
            >
              User Module
            </button>


            <button
              className="admin-module-btn"
              onClick={switchToOrganizer}
            >
              Organizer Module
            </button>

          </div>


          <NavLink
            to="/admin/profile"
            onClick={handleNavigation}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span>Profile</span>
          </NavLink>

        </nav>


        {/* =========================
            Footer
        ========================= */}

        <div className="admin-sidebar-footer">

          <button
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </aside>
    </>
  );
};

export default AdminSidebar;