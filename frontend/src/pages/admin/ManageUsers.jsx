import { useState } from "react";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "9876543210",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      phone: "9876543211",
      status: "Active",
    },
    {
      id: 3,
      name: "Arjun Reddy",
      email: "arjun@gmail.com",
      phone: "9876543212",
      status: "Blocked",
    },
    {
      id: 4,
      name: "Sneha Rao",
      email: "sneha@gmail.com",
      phone: "9876543213",
      status: "Active",
    },
    {
      id: 5,
      name: "Vamsi Krishna",
      email: "vamsi@gmail.com",
      phone: "9876543214",
      status: "Active",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="manage-users">

      <div className="admin-page-header">
        <div>
          <h1>Users</h1>
          <p>Manage registered users in the system.</p>
        </div>
      </div>


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
                  <tr key={user.id}>

                    <td>#{user.id}</td>

                    <td>
                      <div className="user-name">
                        <div className="user-avatar">
                          {user.name.charAt(0)}
                        </div>

                        <span>{user.name}</span>
                      </div>
                    </td>

                    <td>{user.email}</td>

                    <td>{user.phone}</td>

                    <td>
                      <span
                        className={`user-status ${
                          user.status === "Active"
                            ? "active"
                            : "blocked"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <div className="user-actions">

                        <button className="view-btn">
                          View
                        </button>

                        <button className="block-btn">
                          {user.status === "Active"
                            ? "Block"
                            : "Unblock"}
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-row">
                    No users found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ManageUsers;