import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const demoUsers = [
  {
    email: "admin@event.com",
    password: "Admin@123",
    role: "ADMIN",
    name: "Admin User",
  },
  {
    email: "user@event.com",
    password: "User@123",
    role: "USER",
    name: "Demo User",
  },
];

 const handleSubmit = (e) => {
  e.preventDefault();

  setError("");

  const user = demoUsers.find(
    (user) =>
      user.email === email.trim() &&
      user.password === password
  );

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userName", user.name);

    navigate("/home");
  } else {
    setError("Invalid email or password");
  }
};

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #4f46e5, #2563eb, #3b82f6)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "420px",
          maxWidth: "90%",
          borderRadius: "15px",
          padding: "40px",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <FaCalendarAlt
            size={45}
            className="text-primary mb-3"
          />

          <h2
            className="fw-bold"
            style={{ color: "#0d6efd" }}
          >
            Welcome Back
          </h2>

          <p className="text-muted mb-0">
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaEnvelope className="text-secondary" />
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaLock className="text-secondary" />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me / Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mb-3">

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
              />

              <label
                htmlFor="remember"
                className="form-check-label"
              >
                Remember Me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-decoration-none"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            style={{
              borderRadius: "8px",
            }}
          >
            Login
          </button>

          {/* Register */}
          <div className="text-center mt-4">
            <span className="text-muted">
              Don't have an account?
            </span>{" "}

            <Link
              to="/register"
              className="text-decoration-none fw-semibold"
            >
              Register
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;