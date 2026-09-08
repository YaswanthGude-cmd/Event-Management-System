import "./AdminProfile.css";

const AdminProfile = () => {
  return (
    <div className="admin-profile-page">

      <div className="admin-page-header">
        <div>
          <h1>Profile</h1>

          <p>
            Manage your administrator profile.
          </p>
        </div>
      </div>


      <div className="profile-layout">

        {/* Profile Card */}

        <div className="profile-card">

          <div className="profile-avatar">
            A
          </div>

          <h2>Administrator</h2>

          <p>admin@eventmanagement.com</p>

          <span>Administrator</span>

        </div>


        {/* Profile Form */}

        <div className="profile-form-card">

          <h3>Account Information</h3>


          <div className="profile-form">

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value="Administrator"
                readOnly
              />

            </div>


            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                value="admin@eventmanagement.com"
                readOnly
              />

            </div>


            <div className="form-group">

              <label>
                Role
              </label>

              <input
                type="text"
                value="ADMIN"
                readOnly
              />

            </div>


            <div className="form-group">

              <label>
                Phone
              </label>

              <input
                type="text"
                placeholder="Enter phone number"
              />

            </div>


            <button className="profile-save-btn">
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminProfile;