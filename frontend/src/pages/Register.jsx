```jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError("Unable to connect to server");
    }
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
        style={{
          width: "500px",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center fw-bold mb-4">
          Create Account
        </h2>

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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="alert alert-success py-2">
              {success}
            </div>
          )}

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
```
