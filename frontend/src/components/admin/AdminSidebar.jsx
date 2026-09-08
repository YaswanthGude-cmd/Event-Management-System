import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add authentication cleanup here later
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">

      <div className="admin-sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <nav className="admin-sidebar-nav">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/organizers"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>Organizers</span>
        </NavLink>

        <NavLink
          to="/admin/events"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>Events</span>
        </NavLink>

        <NavLink
          to="/admin/registrations"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>Registrations</span>
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>Categories</span>
        </NavLink>

        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span>Profile</span>
        </NavLink>

      </nav>

      <div className="admin-sidebar-footer">
        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </aside>
  );
};

export default AdminSidebar;