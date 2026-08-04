import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend integration later
    console.log("Register Button Clicked");
  };

  return (
    <div
        className="d-flex justify-content-center align-items-center"
        style={{
            width: "100%",
            minHeight: "100vh",
            background:
            "linear-gradient(135deg,#4f46e5,#2563eb,#3b82f6)",
        }}
        >
      <div
        className="card shadow-lg border-0 p-4"
        style={{ width: "500px" , borderRadius:"15px" }}
      >
        <h2 className="text-center fw-bold mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password
            </label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Confirm Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Confirm password"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
          >
            Register
          </button>

          <div className="text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-decoration-none fw-semibold"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
