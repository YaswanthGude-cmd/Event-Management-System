import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const navigate = useNavigate();

const [email , setEmail] = useState("");
const [password , setPassword] = useState("");
const [error , setError] = useState("");

const demoUser = {
    email : "admin@event.com",
    password : "Admin@123",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
        email === demoUser.email &&
        password === demoUser.password
    ) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        navigate("/");
    } else {
        setError("Invalid email or password");
    }
  };

  return (
    <div
    className="d-flex justify-content-center align-items-center"
    style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg,#4f46e5,#2563eb,#3b82f6)",
    }}
    >
    <div
      className="card shadow-lg border-0"
      style={{
        width: "420px",
        borderRadius: "15px",
        padding: "40px",
      }}
    >
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

        <p className="text-muted">
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
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-4">
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
        {error && (
            <div className="alert alert-danger py-2">
                {error}
            </div>
        )}
        <button
          className="btn btn-primary w-100 py-2 fw-semibold"
          style={{
            borderRadius: "8px",
          }}
        >
          Login
        </button>

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