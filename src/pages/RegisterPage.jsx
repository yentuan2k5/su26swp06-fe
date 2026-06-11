import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";
import logoLogin from "../assets/images/logo-login.png";
import { register } from "../services/authService";

function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setMessage("");
        setMessageType("");
    };

    const showError = (text) => {
        setMessage(text);
        setMessageType("error");
    };

    const getRegisterErrorMessage = (error) => {
        const rawMessage = error?.message || "";
        const lowerMessage = rawMessage.toLowerCase();

        if (lowerMessage.includes("email")) {
            return "Email already exists";
        }

        if (lowerMessage.includes("username")) {
            return "Username already exists";
        }

        return rawMessage || "Registration failed";
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (
            !form.username.trim() ||
            !form.email.trim() ||
            !form.password.trim() ||
            !form.confirmPassword.trim()
        ) {
            showError("Please fill in all the required information");
            return;
        }

        if (form.password.length < 8) {
            showError("The password must be at least 8 characters long.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            showError("The password confirmation does not match.");
            return;
        }

        if (!form.role) {
            showError("Please select account type");
            return;
        }

        try {
            setLoading(true);

            await register({
                username: form.username.trim(),
                email: form.email.trim(),
                password: form.password,
                confirmPassword: form.confirmPassword,
                role: form.role,
            });

            setMessage("Create account successfully");
            setMessageType("success");

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (error) {
            showError(getRegisterErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-wrapper">
                <div className="register-left">
                    <div className="brand-box">
                        <img
                            src={logoLogin}
                            alt="ScienceTrend Hub Logo"
                            className="brand-logo-img"
                        />

                        <div>
                            <h2>ScienceTrend Hub</h2>
                            <p>Scientific Journal Publication Tracking</p>
                        </div>
                    </div>

                    <h1>Start Your Research Journey</h1>

                    <p className="register-desc">
                        Create an account to explore scientific papers, follow research
                        trends, save your favorite journals, and manage your personal
                        workspace.
                    </p>

                    <div className="feature-list">
                        <div className="feature-item">Track publication trends</div>
                        <div className="feature-item">Save favorite papers</div>
                        <div className="feature-item">Explore journals and topics</div>
                    </div>
                </div>

                <div className="register-card">
                    <div className="register-header">
                        <h2>Create Account</h2>
                        <p>Please enter your information to register.</p>
                    </div>

                    {message && (
                        <div className={`register-message ${messageType}`}>
                            {message}
                        </div>
                    )}

                    <form className="register-form" onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role" className="role-label">
                                Account Type
                            </label>

                            <select
                                id="role"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="role-dropdown"
                            >
                                <option value="" disabled>
                                    Select your role
                                </option>
                                <option value="STUDENT">Student</option>
                                <option value="LECTURER">Lecturer</option>
                                <option value="RESEARCHER">Researcher</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </form>

                    <p className="login-text">
                        Already have an account?{" "}
                        <Link to="/login" className="login-link">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;