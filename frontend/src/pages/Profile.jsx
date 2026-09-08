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
    department:
      localStorage.getItem("userDepartment") ||
      "Information Technology",
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
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  return (
    <div className="profile-page">

      {/* NAVBAR */}
      <Navbar />

      <div className="profile-layout">

        {/* SIDEBAR */}
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

            <Link
              to="/profile"
              className="active"
            >
              👤 Profile
            </Link>

          </nav>

          <button
            type="button"
            className="profile-logout"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </aside>

        {/* MAIN CONTENT */}
        <main className="profile-content">

          {/* HEADER */}
          <div className="profile-header">

            <div>
              <h1>My Profile</h1>

              <p>
                Manage your personal information and account details.
              </p>
            </div>

            {!isEditing && (
              <button
                type="button"
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            )}

          </div>

          {/* PERSONAL INFORMATION */}
          <section className="profile-card">

            <div className="card-heading">
              <h2>Personal Information</h2>
              <span>👤</span>
            </div>

            <div className="profile-form">

              <div className="form-group">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                />

                <small>
                  Email cannot be changed.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rollNo">
                  Roll Number
                </label>

                <input
                  id="rollNo"
                  type="text"
                  name="rollNo"
                  value={profile.rollNo}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">
                  Department
                </label>

                <input
                  id="department"
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="year">
                  Year
                </label>

                <select
                  id="year"
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
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="save-btn"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

              </div>
            )}

          </section>

          {/* ACCOUNT INFORMATION */}
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