import { useEffect, useState } from "react";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [user, setUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setError("User session not found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to load profile");
        return;
      }

      setUser(data);
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setPhone(data.phone || "");

    } catch (error) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setMessage("");
    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);

    setMessage("");
    setError("");
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      setSaving(true);

      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update profile");
        return;
      }

      setUser(data.user);

      setFirstName(data.user.firstName);
      setLastName(data.user.lastName);
      setPhone(data.user.phone);

      localStorage.setItem(
        "userName",
        `${data.user.firstName} ${data.user.lastName}`
      );

      setMessage("Profile updated successfully");
      setIsEditing(false);

    } catch (error) {
      setError("Unable to connect to server");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-profile-page">
        <div className="profile-loading">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-profile-page">
        <div className="profile-error">
          {error || "Profile not found"}
        </div>
      </div>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  const avatarLetter = user.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "A";

  return (
    <div className="admin-profile-page">

      {/* Header */}

      <div className="admin-page-header">
        <div>
          <h1>Profile</h1>
          <p>Manage your administrator account.</p>
        </div>
      </div>


      {/* Success Message */}

      {message && (
        <div className="profile-success">
          {message}
        </div>
      )}


      {/* Profile */}

      <div className="profile-layout">

        {/* Left Profile Card */}

        <div className="profile-card">

          <div className="profile-avatar">
            {avatarLetter}
          </div>

          <h2>{fullName}</h2>

          <p>{user.email}</p>

          <span>{user.role}</span>

        </div>


        {/* Right Account Information */}

        <div className="profile-form-card">

          <div className="profile-card-header">

            <div>
              <h3>Account Information</h3>

              <p>
                Your personal account details
              </p>
            </div>

            {!isEditing && (
              <button
                className="profile-edit-btn"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            )}

          </div>


          <form
            className="profile-form"
            onSubmit={handleSave}
          >

            {/* First Name */}

            <div className="form-group">

              <label>First Name</label>

              <input
                type="text"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                readOnly={!isEditing}
              />

            </div>


            {/* Last Name */}

            <div className="form-group">

              <label>Last Name</label>

              <input
                type="text"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                readOnly={!isEditing}
              />

            </div>


            {/* Email */}

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                value={user.email}
                readOnly
              />

            </div>


            {/* Role */}

            <div className="form-group">

              <label>Role</label>

              <input
                type="text"
                value={user.role}
                readOnly
              />

            </div>


            {/* Phone */}

            <div className="form-group">

              <label>Phone</label>

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                readOnly={!isEditing}
              />

            </div>


            {/* Edit Actions */}

            {isEditing && (
              <div className="profile-form-actions">

                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="profile-save-btn"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>
            )}

          </form>

          {error && (
            <p className="profile-error">
              {error}
            </p>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminProfile;
