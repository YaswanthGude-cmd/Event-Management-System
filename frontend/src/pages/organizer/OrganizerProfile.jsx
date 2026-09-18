import React from "react";
import "./OrganizerProfile.css";

const OrganizerProfile = () => {
  return (
    <div className="organizer-profile-page">

      <div className="profile-page-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal and organizer account information.</p>
        </div>

        <button className="edit-profile-btn">
          Edit Profile
        </button>
      </div>

      <div className="profile-content">

        {/* Profile Overview */}
        <div className="profile-overview">

          <div className="profile-avatar">
            O
          </div>

          <div className="profile-overview-info">
            <h2>Organizer</h2>

            <p className="profile-email">
              organizer@example.com
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
            <p>Your basic account information.</p>
          </div>

          <div className="profile-grid">

            <div className="profile-field">
              <label>Full Name</label>
              <div className="field-value">
                Organizer
              </div>
            </div>

            <div className="profile-field">
              <label>Email Address</label>
              <div className="field-value">
                organizer@example.com
              </div>
            </div>

            <div className="profile-field">
              <label>Phone Number</label>
              <div className="field-value">
                +91 98765 43210
              </div>
            </div>

            <div className="profile-field">
              <label>Role</label>
              <div className="field-value">
                Event Organizer
              </div>
            </div>

          </div>

        </div>

        {/* Organizer Information */}
        <div className="profile-section">

          <div className="section-header">
            <h2>Organizer Information</h2>
            <p>Information related to your organizer account.</p>
          </div>

          <div className="profile-grid">

            <div className="profile-field">
              <label>Organizer ID</label>
              <div className="field-value">
                ORG-001
              </div>
            </div>

            <div className="profile-field">
              <label>Account Status</label>
              <div className="field-value">
                <span className="status-badge">
                  Active
                </span>
              </div>
            </div>

            <div className="profile-field">
              <label>Events Created</label>
              <div className="field-value">
                12 Events
              </div>
            </div>

            <div className="profile-field">
              <label>Member Since</label>
              <div className="field-value">
                January 2026
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrganizerProfile;