import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const storedEmail =
    localStorage.getItem("userEmail") || "student@anits.edu.in";

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: localStorage.getItem("userName") || "Yaswanth Gude",
    email: storedEmail,
    phone: localStorage.getItem("userPhone") || "+91 9876543210",
    rollNo: localStorage.getItem("userRollNo") || "22IT001",
    department: localStorage.getItem("userDepartment") || "Information Technology",
    year: localStorage.getItem("userYear") || "2nd Year",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("userName", profile.name);
    localStorage.setItem("userPhone", profile.phone);
    localStorage.setItem("userRollNo", profile.rollNo);
    localStorage.setItem("userDepartment", profile.department);
    localStorage.setItem("userYear", profile.year);

    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  return (
    <div className="profile-page">

      <Navbar />

      <div className="profile-layout">

        {/* Sidebar */}
        <aside className="profile-sidebar">

          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <h2>{profile.name}</h2>
          <p>{profile.email}</p>

          <nav className="profile-nav">

            <Link to="/dashboard">
              📊 Dashboard
            </Link>

            <Link to="/my-registrations">
              📄 My Registrations
            </Link>

            <Link to="/profile" className="active">
              👤 Profile
            </Link>

          </nav>

          <button
            className="profile-logout"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </aside>

        {/* Main Content */}
        <main className="profile-content">

          <div className="profile-header">
            <div>
              <h1>My Profile</h1>
              <p>
                Manage your personal information and account details.
              </p>
            </div>

            {!isEditing && (
              <button
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>

          {/* Personal Information */}
          <section className="profile-card">

            <div className="card-heading">
              <h2>Personal Information</h2>
              <span>👤</span>
            </div>

            <div className="profile-form">

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                />

                <small>Email cannot be changed.</small>
              </div>

              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Roll Number</label>

                <input
                  type="text"
                  name="rollNo"
                  value={profile.rollNo}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Department</label>

                <input
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Year</label>

                <select
                  name="year"
                  value={profile.year}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>

            </div>

            {isEditing && (
              <div className="profile-actions">

                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>

                <button
                  className="save-btn"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

              </div>
            )}

          </section>

          {/* Account Information */}
          <section className="profile-card">

            <div className="card-heading">
              <h2>Account Information</h2>
              <span>🔐</span>
            </div>

            <div className="account-info">

              <div>
                <span>Account Status</span>
                <strong className="status-active">
                  ● Active
                </strong>
              </div>

              <div>
                <span>Account Type</span>
                <strong>Student</strong>
              </div>

              <div>
                <span>Registered Events</span>
                <strong>8 Events</strong>
              </div>

              <div>
                <span>Completed Events</span>
                <strong>5 Events</strong>
              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
};

export default Profile;
