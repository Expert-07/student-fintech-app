import React, { useState } from "react";
import "../css/LoginTemplate.css";
import { FaGraduationCap, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaGoogle, FaMicrosoft, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function LoginTemplate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    // Simulate login process (replace with real API call)
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
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
                className="lt-form-control"
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="lt-form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </div>
      </div>
    </div>
  );
}