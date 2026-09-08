import { Link } from "react-router-dom";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">

      {/* Header */}

      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Overview of your event management system.
          </p>
        </div>
      </div>


      {/* Statistics */}

      <div className="admin-stats-grid">

        <div className="admin-stat-card">
          <p>Total Users</p>
          <h2>120</h2>
          <span>Registered users</span>
        </div>


        <div className="admin-stat-card">
          <p>Organizers</p>
          <h2>18</h2>
          <span>Active organizers</span>
        </div>


        <div className="admin-stat-card">
          <p>Total Events</p>
          <h2>42</h2>
          <span>Created events</span>
        </div>


        <div className="admin-stat-card">
          <p>Registrations</p>
          <h2>356</h2>
          <span>Total registrations</span>
        </div>

      </div>


      {/* Dashboard Grid */}

      <div className="admin-dashboard-grid">

        {/* Recent Events */}

        <div className="admin-dashboard-card">

          <div className="admin-card-header">

            <div>
              <h3>Recent Events</h3>

              <p>
                Latest events created in the system.
              </p>
            </div>

            <Link to="/admin/events">
              View All
            </Link>

          </div>


          <div className="admin-table-container">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Event</th>
                  <th>Organizer</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Tech Fest 2026</td>
                  <td>Rahul Kumar</td>
                  <td>
                    <span className="status-badge active">
                      Active
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Hackathon 2026</td>
                  <td>Priya Sharma</td>
                  <td>
                    <span className="status-badge pending">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Web Development Workshop</td>
                  <td>Arjun Reddy</td>
                  <td>
                    <span className="status-badge active">
                      Active
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>


        {/* Quick Actions */}

        <div className="admin-dashboard-card">

          <div className="admin-card-header">

            <div>
              <h3>Quick Actions</h3>

              <p>
                Frequently used actions.
              </p>
            </div>

          </div>


          <div className="admin-quick-actions">

            <Link
              to="/admin/users"
              className="admin-action-item"
            >
              <div>
                <strong>Manage Users</strong>
                <span>View and manage users</span>
              </div>

              <b>→</b>
            </Link>


            <Link
              to="/admin/organizers"
              className="admin-action-item"
            >
              <div>
                <strong>Manage Organizers</strong>
                <span>Manage organizer accounts</span>
              </div>

              <b>→</b>
            </Link>


            <Link
              to="/admin/events"
              className="admin-action-item"
            >
              <div>
                <strong>Manage Events</strong>
                <span>Review and manage events</span>
              </div>

              <b>→</b>
            </Link>


            <Link
              to="/admin/registrations"
              className="admin-action-item"
            >
              <div>
                <strong>Registrations</strong>
                <span>View event registrations</span>
              </div>

              <b>→</b>
            </Link>

          </div>

        </div>

      </div>


      {/* Recent Registrations */}

      <div className="admin-dashboard-card">

        <div className="admin-card-header">

          <div>
            <h3>Recent Registrations</h3>

            <p>
              Latest event registrations.
            </p>
          </div>

          <Link to="/admin/registrations">
            View All
          </Link>

        </div>


        <div className="admin-table-container">

          <table className="admin-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Event</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Vamsi Krishna</td>
                <td>Tech Fest 2026</td>
                <td>08 Sep 2026</td>
                <td>
                  <span className="status-badge active">
                    Confirmed
                  </span>
                </td>
              </tr>

              <tr>
                <td>Harsha Vardhan</td>
                <td>Hackathon 2026</td>
                <td>08 Sep 2026</td>
                <td>
                  <span className="status-badge active">
                    Confirmed
                  </span>
                </td>
              </tr>

              <tr>
                <td>Anjali Rao</td>
                <td>AI & ML Seminar</td>
                <td>07 Sep 2026</td>
                <td>
                  <span className="status-badge pending">
                    Pending
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;