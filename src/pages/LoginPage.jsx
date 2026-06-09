import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/images/logo-login.png";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await login({ username, password });

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert("Đăng nhập thành công");
      navigate("/dashboard");
    } catch (error) {
      alert("Đăng nhập thất bại: " + error.message);
    }


  };

  const handleGmailLogin = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };
  return (
    <main className="auth-page">
      <div className="auth-bg-blur auth-bg-blur-left"></div>
      <div className="auth-bg-blur auth-bg-blur-right"></div>

      <section className="auth-layout">
        {/* LEFT SIDE */}
        <div className="auth-left">
          <div className="auth-brand">
            <div className="auth-logo-box">
              <img
                className="auth-logo-img"
                src={logo}
                alt="ScienceTrend Hub logo"
              />
            </div>

            <div className="auth-brand-text">
              <h1>ScienceTrend Hub</h1>
              <p>Scientific Journal Publication Tracking</p>
            </div>
          </div>

          <div className="auth-left-content">
            <div className="auth-hero">
              <span className="auth-badge">Research Dashboard</span>

              <h2>Welcome!</h2>

              <p>
                Login to explore scientific trends, manage saved papers, track
                journals and analyze publication data.
              </p>
            </div>

            <div className="auth-preview-card">
              <div className="preview-header">
                <div>
                  <h3>Publication Trends</h3>
                  <p>2020 - 2026</p>
                </div>


              </div>

              <div className="preview-chart">
                <div className="preview-bar bar-1"></div>
                <div className="preview-bar bar-2"></div>
                <div className="preview-bar bar-3"></div>
                <div className="preview-bar bar-4"></div>
                <div className="preview-bar bar-5"></div>
                <div className="preview-bar bar-6"></div>
              </div>

              <div className="preview-topics">
                <div className="preview-topic-row">
                  <span className="topic-dot topic-blue"></span>
                  <p>Artificial Intelligence</p>
                  <strong>32%</strong>
                </div>

                <div className="preview-topic-row">
                  <span className="topic-dot topic-green"></span>
                  <p>Machine Learning</p>
                  <strong>28%</strong>
                </div>

                <div className="preview-topic-row">
                  <span className="topic-dot topic-yellow"></span>
                  <p>Cybersecurity</p>
                  <strong>21%</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-stats">
            <div className="auth-stat-card">
              <h3>1.2M+</h3>
              <p>Papers indexed</p>
            </div>

            <div className="auth-stat-card">
              <h3>43K+</h3>
              <p>Journals tracked</p>
            </div>

            <div className="auth-stat-card">
              <h3>2K+</h3>
              <p>Active users</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-card-header">
              <h2>Sign in</h2>
              <p>Enter your username and password to continue.</p>
            </div>

            <form className="auth-form" onSubmit={handleLogin}>
              <div className="auth-form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="auth-options">
                <label className="auth-remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <button type="submit" className="auth-login-btn">
                Login
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="auth-google-btn"
              onClick={handleGmailLogin}
            >
              <FcGoogle className="auth-google-icon" />
              <span>Login with Gmail</span>
            </button>

            <p className="auth-register-text">
              Do not have an account? <Link to="/register">Create account</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;