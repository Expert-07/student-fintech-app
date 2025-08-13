import React, { useState } from "react";
import "../css/LoginTemplate.css";
import { FaGraduationCap, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaGoogle, FaMicrosoft, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function LoginTemplate() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(""); // For displaying notifications

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const responseData = await res.json();

      if (!res.ok) {
        setNotification(responseData.message || "Login failed");
      } else {
        console.log("Login successful. Token:", responseData.token);
        console.log("Saved token: ", localStorage.getItem("token"));
        
        localStorage.setItem("token", responseData.token); // ✅ Store token
        navigate("/dashboard"); // ✅ Navigate without reloading
      }
    } catch (err) {
      console.error("Login error:", err);
      setNotification("Something went wrong.");
    }

    console.log("Logging in:", form);
  };
  return (
    <div className="lt-login-bg">
      <div className="lt-container">
        <div className="lt-login-card">
          <div className="lt-login-header">
            <h1>
              <FaGraduationCap className="lt-floating" style={{ color: "var(--primary)" }} />
              StudentAssist
            </h1>
            <p>Login to your student dashboard</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="lt-form-group">
              <label htmlFor="lt-email">Email Address</label>
              <div className="lt-input-icon">
                <FaEnvelope />
              </div>
              <input
              type="email"
                id="lt-email"
                name="email"
                className="lt-form-control"
                placeholder="student@university.edu"
            value={form.email}
            onChange={handleChange}
                required
              />
            </div>
            <div className="lt-form-group">
              <label htmlFor="lt-password">Password</label>
              <div className="lt-input-icon">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="lt-password"
                name="password"
                className="lt-form-control"
                placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
                required
              />
              <span
                className="lt-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={0}
                role="button"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="lt-form-options">
              <div className="lt-remember-me">
                <input type="checkbox" id="lt-remember" />
                <label htmlFor="lt-remember">Remember me</label>
              </div>
              <a href="#" className="lt-forgot-password">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="lt-btn" disabled={loading}>
              {loading ? (
                <span>
                  <FaSignInAlt className="me-2 fa-spin" /> Authenticating...
                </span>
              ) : (
                <span>
                  {/*<FaSignInAlt className="me-2" />*/} Login to Dashboard
                </span>
              )}
            </button>
            <div className="lt-divider">
              <span>or continue with</span>
            </div>
            <div className="lt-social-login">
              <a href="#" className="lt-social-btn" aria-label="Login with Google">
                <FaGoogle />
              </a>
              <a href="#" className="lt-social-btn" aria-label="Login with Microsoft">
                <FaMicrosoft />
              </a>
              <a href="#" className="lt-social-btn" aria-label="Login with Apple">
                <FaApple />
              </a>
            </div>
            <div className="lt-auth-footer">
              Don't have an account? <Link to="/register">Sign up here</Link>
            </div>
          </form>
          {notification && (
            <div className="lt-notification">
              {notification}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}