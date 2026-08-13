import { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Courses", icon: "📚" },
    { name: "Attendance", icon: "📊" },
    { name: "Assignments", icon: "📝" },
    { name: "Events", icon: "📅" },
    { name: "Notifications", icon: "🔔" },
    { name: "Profile", icon: "👤" },
  ];

  const courses = [
    ["Machine Learning", "CSE-AIML"],
    ["Database Management System", "CSE-AIML"],
    ["Web Development", "CSE-AIML"],
    ["Computer Networks", "CSE-AIML"],
    ["Artificial Intelligence", "CSE-AIML"],
    ["Java Programming", "CSE-AIML"],
  ];

  const attendance = [
    ["Machine Learning", 90],
    ["DBMS", 85],
    ["Web Development", 92],
    ["Computer Networks", 78],
    ["Artificial Intelligence", 88],
  ];

  const assignments = [
    ["Machine Learning", "Classification Algorithm", "20 Aug"],
    ["DBMS", "Normalization", "22 Aug"],
    ["Web Development", "React Project", "25 Aug"],
    ["AI", "Minimax Algorithm", "28 Aug"],
  ];

  const renderDashboard = () => (
    <>
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div>
          <h1>Welcome, Maneesha! 👋</h1>
          <p>Have a great day and keep learning.</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <div>
            <h3>Attendance</h3>
            <h2>85%</h2>
          </div>

          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📚</div>
          <h3>Courses</h3>
          <h2>6</h2>
          <p>Active courses</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📝</div>
          <h3>Assignments</h3>
          <h2>4</h2>
          <p>Pending assignments</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <h3>Events</h3>
          <h2>3</h2>
          <p>Upcoming events</p>
        </div>

      </div>

      {/* Schedule */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Today's Schedule</h2>
          <span>Today</span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Room</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>09:00 AM</td>
                <td>Machine Learning</td>
                <td>Lab 1</td>
              </tr>

              <tr>
                <td>11:00 AM</td>
                <td>Database Management System</td>
                <td>Room 204</td>
              </tr>

              <tr>
                <td>02:00 PM</td>
                <td>Web Development</td>
                <td>Lab 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderCourses = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>My Courses</h2>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Branch</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course[0]}>
                <td>{course[0]}</td>
                <td>{course[1]}</td>
                <td>
                  <span className="status-badge">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Attendance</h2>
      </div>

      <div className="attendance-list">
        {attendance.map((subject) => (
          <div className="attendance-item" key={subject[0]}>
            <div className="attendance-info">
              <strong>{subject[0]}</strong>
              <span>{subject[1]}%</span>
            </div>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${subject[1]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Assignments</h2>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Assignment</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment[1]}>
                <td>{assignment[0]}</td>
                <td>{assignment[1]}</td>
                <td>{assignment[2]}</td>
                <td>
                  <button
                    className="dashboard-button"
                    onClick={() =>
                      alert("Assignment opened!")
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Upcoming Events</h2>
      </div>

      <div className="event-list">

        <div className="event-card">
          <h3>ANITS Tech Fest</h3>
          <p>📅 August 20, 2026</p>
          <p>
            Coding competitions and technical events.
          </p>
        </div>

        <div className="event-card">
          <h3>AI & ML Workshop</h3>
          <p>📅 September 15, 2026</p>
          <p>
            Learn Artificial Intelligence and Machine Learning.
          </p>
        </div>

        <div className="event-card">
          <h3>Cultural Fest</h3>
          <p>📅 September 25, 2026</p>
          <p>
            Music, dance and cultural programs.
          </p>
        </div>

      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Notifications</h2>
      </div>

      <div className="notification-list">

        <div className="notification">
          <span className="notification-icon">📝</span>
          <div>
            <h3>Assignment Reminder</h3>
            <p>
              DBMS assignment submission is due soon.
            </p>
          </div>
        </div>

        <div className="notification">
          <span className="notification-icon">📅</span>
          <div>
            <h3>Workshop Registration</h3>
            <p>
              AI & ML workshop registration is open.
            </p>
          </div>
        </div>

        <div className="notification">
          <span className="notification-icon">🔔</span>
          <div>
            <h3>Exam Notice</h3>
            <p>
              Internal examinations schedule will be
              announced soon.
            </p>
          </div>
        </div>

      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Student Profile</h2>
      </div>

      <div className="profile-container">

        <div className="profile-avatar">
          M
        </div>

        <div className="profile-info">
          <p>
            <strong>Name:</strong> Maneesha
          </p>

          <p>
            <strong>College:</strong> ANITS
          </p>

          <p>
            <strong>Branch:</strong> CSE (AI & ML)
          </p>

          <p>
            <strong>Year:</strong> 3rd Year
          </p>

          <p>
            <strong>Email:</strong> student@anits.edu.in
          </p>
        </div>

      </div>
    </div>
  );

  const renderPage = () => {
    switch (activePage) {
      case "Courses":
        return renderCourses();

      case "Attendance":
        return renderAttendance();

      case "Assignments":
        return renderAssignments();

      case "Events":
        return renderEvents();

      case "Notifications":
        return renderNotifications();

      case "Profile":
        return renderProfile();

      default:
        return renderDashboard();
    }
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">

        <div className="college-logo">
          <div className="logo-circle">
            A
          </div>

          <h2>ANITS</h2>
          <p>Student Portal</p>
        </div>

        <nav className="dashboard-menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activePage === item.name
                  ? "menu-item active"
                  : "menu-item"
              }
              onClick={() => setActivePage(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

      </aside>

      {/* Main */}
      <main className="dashboard-main">

        {/* Topbar */}
        <header className="dashboard-topbar">

          <div>
            <h2>Student Dashboard</h2>
            <p>Manage your academic activities</p>
          </div>

          <div className="student-details">
            <div className="student-avatar">
              M
            </div>

            <div>
              <strong>Maneesha</strong>
              <span>CSE (AI & ML)</span>
            </div>
          </div>

        </header>

        {/* Page Content */}
        <section className="dashboard-content">
          {renderPage()}
        </section>

      </main>

    </div>
  );
};

export default Dashboard;