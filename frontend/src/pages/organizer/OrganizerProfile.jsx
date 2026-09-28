import React, { useEffect, useState } from "react";
import "./OrganizerProfile.css";

const OrganizerProfile = () => {
  const [user, setUser] = useState(null);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setError("Please login again");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch profile");
        return;
      }

      const userData = data.user || data;

      setUser(userData);

      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });

    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      setError("");

      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update profile");
        return;
      }

      alert("Profile updated successfully!");

      setEditing(false);

      // Fetch updated data
      fetchProfile();

      // Update localStorage name/email
      localStorage.setItem(
        "userName",
        `${formData.firstName} ${formData.lastName}`
      );

      localStorage.setItem(
        "userEmail",
        formData.email
      );

    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Unable to connect to server");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="organizer-profile-page">
        <h1>My Profile</h1>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="organizer-profile-page">
        <h1>My Profile</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim();

  const eventCount = user.eventCount || 0;

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      )
    : "N/A";

  return (
    <div className="organizer-profile-page">

      {/* Page Header */}
      <div className="profile-page-header">

        <div>
          <h1>My Profile</h1>

          <p>
            Manage your personal and organizer account information.
          </p>
        </div>

        {!editing && (
          <button
            className="edit-profile-btn"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        )}

      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div className="profile-content">

        {/* Profile Overview */}
        <div className="profile-overview">

          <div className="profile-avatar">
            {fullName.charAt(0).toUpperCase()}
          </div>

          <div className="profile-overview-info">

            <h2>{fullName}</h2>

            <p className="profile-email">
              {user.email}
            </p>

            <span className="role-badge">
              Event Organizer
            </span>

          </div>

        </div>

        {/* Personal Information */}
        <div className="profile-section">

          <div className="section-header">
            <h2>Personal Information</h2>

            <p>
              Your basic account information.
            </p>
          </div>

          <div className="profile-grid">

            {/* First Name */}
            <div className="profile-field">

              <label>First Name</label>

              {editing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">
                  {user.firstName}
                </div>
              )}

            </div>

            {/* Last Name */}
            <div className="profile-field">

              <label>Last Name</label>

              {editing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">
                  {user.lastName}
                </div>
              )}

            </div>

            {/* Email */}
            <div className="profile-field">

              <label>Email Address</label>

              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">
                  {user.email}
                </div>
              )}

            </div>

            {/* Phone */}
            <div className="profile-field">

              <label>Phone Number</label>

              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">
                  {user.phone}
                </div>
              )}

            </div>

            {/* Role */}
            <div className="profile-field">

              <label>Role</label>

              <div className="field-value">
                Event Organizer
              </div>

            </div>

          </div>

          {/* Edit Buttons */}
          {editing && (
            <div style={{ marginTop: "20px" }}>

              <button
                className="edit-profile-btn"
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              <button
                className= "cancel-profile-btn"
                onClick={() => setEditing(false)}
                disabled={updating}
                style={{
                  marginLeft: "10px",
                  padding: "10px 18px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

            </div>
          )}

        </div>

        {/* Organizer Information */}
        <div className="profile-section">

          <div className="section-header">

            <h2>Organizer Information</h2>

            <p>
              Information related to your organizer account.
            </p>

          </div>

          <div className="profile-grid">

            {/* Organizer ID */}
            <div className="profile-field">

              <label>Organizer ID</label>

              <div className="field-value">
                {user._id}
              </div>

            </div>

            {/* Account Status */}
            <div className="profile-field">

              <label>Account Status</label>

              <div className="field-value">

                <span className="status-badge">
                  {user.status || "ACTIVE"}
                </span>

              </div>

            </div>

            {/* Events Created */}
            <div className="profile-field">

              <label>Events Created</label>

              <div className="field-value">
                {eventCount} Events
              </div>

            </div>

            {/* Member Since */}
            <div className="profile-field">

              <label>Member Since</label>

              <div className="field-value">
                {memberSince}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrganizerProfile;