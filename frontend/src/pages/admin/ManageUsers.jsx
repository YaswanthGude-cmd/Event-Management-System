import { useEffect, useState } from "react";
import "./ManageUsers.css";

const API_URL = import.meta.env.VITE_API_URL;
const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/users`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch users");
        return;
      }

      setUsers(data.users || data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockToggle = async (user) => {
    const isBlocked = user.status === "BLOCKED";

    const action = isBlocked ? "unblock" : "block";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this user?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/admin/users/${user._id}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || `Failed to ${action} user`);
        return;
      }

      const updatedUser = data.user || data;

      setUsers((prevUsers) =>
        prevUsers.map((currentUser) =>
          currentUser._id === user._id
            ? {
                ...currentUser,
                ...updatedUser,
                status:
                  updatedUser.status ||
                  (isBlocked ? "ACTIVE" : "BLOCKED"),
              }
            : currentUser
        )
      );

      if (selectedUser?._id === user._id) {
        setSelectedUser((prev) => ({
          ...prev,
          ...updatedUser,
          status:
            updatedUser.status ||
            (isBlocked ? "ACTIVE" : "BLOCKED"),
        }));
      }
    } catch (error) {
      console.error(`Error trying to ${action} user:`, error);
      alert("Unable to connect to server");
    } finally {
      setActionLoading(false);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const closeUserDetails = () => {
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ""} ${
      user.lastName || ""
    }`.trim();

    return (
      fullName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (user.email || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const getFullName = (user) => {
    const fullName = `${user.firstName || ""} ${
      user.lastName || ""
    }`.trim();

    return fullName || "Unknown User";
  };

  if (loading) {
    return (
      <div className="manage-users">
        <div className="admin-page-header">
          <div>
            <h1>Users</h1>
            <p>Manage registered users in the system.</p>
          </div>
        </div>

        <div className="users-table-card">
          <div className="admin-dashboard-message">
            Loading users...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-users">
        <div className="admin-page-header">
          <div>
            <h1>Users</h1>
            <p>Manage registered users in the system.</p>
          </div>
        </div>

        <div className="users-table-card">
          <div className="admin-dashboard-message error">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-users">

      {/* Header */}

      <div className="admin-page-header">
        <div>
          <h1>Users</h1>
          <p>Manage registered users in the system.</p>
        </div>
      </div>


      {/* Toolbar */}

      <div className="users-toolbar">

        <div className="users-search">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="users-count">
          {filteredUsers.length} Users
        </div>

      </div>


      {/* Users Table */}

      <div className="users-table-card">

        <div className="admin-table-container">

          <table className="admin-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (

                  <tr key={user._id}>

                    <td>
                      #{user._id.slice(-6)}
                    </td>

                    <td>
                      <div className="user-name">

                        <div className="user-avatar">
                          {getFullName(user)
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <span>
                          {getFullName(user)}
                        </span>

                      </div>
                    </td>

                    <td>
                      {user.email || "N/A"}
                    </td>

                    <td>
                      {user.phone || "N/A"}
                    </td>

                    <td>

                      <span
                        className={`user-status ${
                          user.status === "ACTIVE"
                            ? "active"
                            : "blocked"
                        }`}
                      >
                        {user.status === "ACTIVE"
                          ? "Active"
                          : "Blocked"}
                      </span>

                    </td>

                    <td>

                      <div className="user-actions">

                        <button
                          className="view-btn"
                          onClick={() =>
                            handleView(user)
                          }
                        >
                          View
                        </button>

                        <button
                          className="block-btn"
                          onClick={() =>
                            handleBlockToggle(user)
                          }
                          disabled={actionLoading}
                        >
                          {user.status === "ACTIVE"
                            ? "Block"
                            : "Unblock"}
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="6"
                    className="empty-row"
                  >
                    No users found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* User Details */}

      {selectedUser && (

        <div className="user-details-overlay">

          <div className="user-details-modal">

            <div className="user-details-header">

              <div>
                <h2>User Details</h2>
                <p>
                  View information about this user.
                </p>
              </div>

              <button
                className="close-user-modal"
                onClick={closeUserDetails}
              >
                ×
              </button>

            </div>


            <div className="user-details-content">

              <div className="user-details-avatar">
                {getFullName(selectedUser)
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="user-details-info">

                <div>
                  <span>Name</span>
                  <strong>
                    {getFullName(selectedUser)}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {selectedUser.email || "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedUser.phone || "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Role</span>
                  <strong>
                    {selectedUser.role || "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>
                    {selectedUser.status === "ACTIVE"
                      ? "Active"
                      : "Blocked"}
                  </strong>
                </div>

              </div>

            </div>


            <div className="user-details-actions">

              <button
                className="view-close-btn"
                onClick={closeUserDetails}
              >
                Close
              </button>

              <button
                className="block-btn"
                onClick={() =>
                  handleBlockToggle(selectedUser)
                }
                disabled={actionLoading}
              >
                {selectedUser.status === "ACTIVE"
                  ? "Block User"
                  : "Unblock User"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ManageUsers;