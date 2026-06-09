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
            alert("Vui lòng nhập username hoặc email");
            return;
        }

        try {
            setLoading(true);
            const res = await forgotPassword(identifier.trim());
            alert(res || "Đã gửi link reset password vào email của bạn");
        } catch (error) {
            alert("Gửi email thất bại: " + error.message);
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
                        placeholder="Nhập username hoặc email của bạn"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Đang gửi..." : "Send reset link"}
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