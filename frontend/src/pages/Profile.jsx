import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

const API_URL = import.meta.env.VITE_API_URL;
const Profile = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    status: "",
  });

  const [registeredEvents, setRegisteredEvents] = useState(0);
  const [completedEvents, setCompletedEvents] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        navigate("/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [userResponse, registrationsResponse] =
        await Promise.all([
          fetch(
            `${API_URL}/api/users/${userId}`,
            {
              method: "GET",
              headers,
            }
          ),

          fetch(
            `${API_URL}/api/registrations/user/${userId}`,
            {
              method: "GET",
              headers,
            }
          ),
        ]);

      const userData = await userResponse.json();
      const registrationsData =
        await registrationsResponse.json();

      if (!userResponse.ok) {
        throw new Error(
          userData.message || "Failed to fetch profile"
        );
      }

      if (!registrationsResponse.ok) {
        throw new Error(
          registrationsData.message ||
            "Failed to fetch registrations"
        );
      }

      const user = userData.user || userData;

      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
        status: user.status || "",
      });

      // Keep localStorage name updated
      localStorage.setItem(
        "userName",
        `${user.firstName || ""} ${user.lastName || ""}`.trim()
      );

      localStorage.setItem("userEmail", user.email || "");

      const registrations =
        registrationsData.registrations || [];

      const registered = registrations.filter(
        (registration) =>
          registration.status === "REGISTERED"
      ).length;

      const completed = registrations.filter(
        (registration) =>
          registration.eventId?.status === "COMPLETED"
      ).length;

      setRegisteredEvents(registered);
      setCompletedEvents(completed);
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error
      );

      setError(
        error.message || "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: profile.firstName,
            lastName: profile.lastName,
            phone: profile.phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to update profile"
        );
        return;
      }

      const updatedUser = data.user;

      setProfile({
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        role: updatedUser.role || "",
        status: updatedUser.status || "",
      });

      localStorage.setItem(
        "userName",
        `${updatedUser.firstName || ""} ${
          updatedUser.lastName || ""
        }`.trim()
      );

      localStorage.setItem(
        "userEmail",
        updatedUser.email || ""
      );

      setIsEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error
      );

      alert("Unable to connect to server");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProfile();
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    navigate("/login");
  };

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim() ||
    "User";

  const initials =
    `${profile.firstName?.charAt(0) || ""}${
      profile.lastName?.charAt(0) || ""
    }`.toUpperCase() || "U";

  if (loading) {
    return (
      <div className="profile-page">
        <Navbar />

        <div className="profile-loading">
          <div className="profile-loading-card">
            <div className="loading-spinner"></div>
            <h2>Loading Profile</h2>
            <p>Please wait while we fetch your details.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <Navbar />

        <div className="profile-loading">
          <div className="profile-loading-card">
            <div className="profile-error-icon">!</div>

            <h2>Unable to Load Profile</h2>

            <p>{error}</p>

            <button
              type="button"
              className="edit-profile-btn"
              onClick={fetchProfile}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <Navbar />

      <div className="profile-layout">

        {/* SIDEBAR */}
        <aside className="profile-sidebar">

          <div className="profile-user-card">

            <div className="profile-avatar">
              {initials}
            </div>

            <h2>{fullName}</h2>

            <p>{profile.email}</p>

            <span className="profile-role">
              {profile.role || "USER"}
            </span>

          </div>

          <nav className="profile-nav">

            <Link to="/dashboard">
              <span>📊</span>
              <span>Dashboard</span>
            </Link>

            <Link to="/my-registrations">
              <span>📄</span>
              <span>My Registrations</span>
            </Link>

            <Link
              to="/profile"
              className="active"
            >
              <span>👤</span>
              <span>Profile</span>
            </Link>

          </nav>

          <button
            type="button"
            className="profile-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            <span>Logout</span>
          </button>

        </aside>

        {/* MAIN CONTENT */}
        <main className="profile-content">

          {/* HEADER */}
          <div className="profile-header">

            <div>
              <span className="profile-page-label">
                ACCOUNT
              </span>

              <h1>My Profile</h1>

              <p>
                Manage your personal information and
                account details.
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

              <div>
                <h2>Personal Information</h2>
                <p>
                  Your basic account information
                </p>
              </div>

              <div className="card-heading-icon">
                👤
              </div>

            </div>

            <div className="profile-form">

              <div className="form-group">

                <label htmlFor="firstName">
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter first name"
                />

              </div>

              <div className="form-group">

                <label htmlFor="lastName">
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter last name"
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
                  Email address cannot be changed.
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
                  placeholder="Enter phone number"
                />

              </div>

            </div>

            {isEditing && (
              <div className="profile-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="save-btn"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>
            )}

          </section>

          {/* ACCOUNT INFORMATION */}
          <section className="profile-card">

            <div className="card-heading">

              <div>
                <h2>Account Information</h2>
                <p>
                  Your account and participation details
                </p>
              </div>

              <div className="card-heading-icon">
                🔐
              </div>

            </div>

            <div className="account-info">

              <div className="account-info-item">

                <span>Account Status</span>

                <strong
                  className={
                    profile.status === "ACTIVE"
                      ? "status-active"
                      : "status-other"
                  }
                >
                  ●{" "}
                  {profile.status || "UNKNOWN"}
                </strong>

              </div>

              <div className="account-info-item">

                <span>Account Type</span>

                <strong>
                  {profile.role || "USER"}
                </strong>

              </div>

              <div className="account-info-item">

                <span>Registered Events</span>

                <strong>
                  {registeredEvents}
                </strong>

              </div>

              <div className="account-info-item">

                <span>Completed Events</span>

                <strong>
                  {completedEvents}
                </strong>

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
};

export default Profile;