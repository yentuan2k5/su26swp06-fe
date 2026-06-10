import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import "../styles/ForgotPassWordPage.css";

function ForgotPassWordPage() {
    const [identifier, setIdentifier] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!identifier.trim()) {
            alert("Please enter your username or email.");
            return;
        }

        try {
            setLoading(true);
            const res = await forgotPassword(identifier.trim());
            alert(res || "Password reset link has been sent to your email.");
        } catch (error) {
            alert("Failed to send email: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="forgot-page">
            <div className="forgot-card">
                <h2>Forgot Password</h2>
                <p>Enter your username or email to receive the password reset link.</p>

                <form onSubmit={handleForgotPassword}>
                    <label>Username or Email</label>
                    <input
                        type="text"
                        placeholder="Enter your username or email"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send reset link"}
                    </button>
                </form>

                <div className="back-login">
                    <Link to="/login" className="back-login-link">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default ForgotPassWordPage;