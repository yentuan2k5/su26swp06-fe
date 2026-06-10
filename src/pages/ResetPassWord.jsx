import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../services/authService";
import "../styles/ResetPassWord.css";

function ResetPassWord() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("Invalid or missing token");
            return;
        }

        if (!newPassword || !confirmPassword) {
            alert("Please fill in all password fields");
            return;
        }

        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Password confirmation does not match");
            return;
        }

        try {
            setLoading(true);
            const res = await resetPassword(token, newPassword, confirmPassword);
            alert(res || "Password reset successful");
            navigate("/login");
        } catch (error) {
            alert("Failed to reset password: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="reset-page">
            <div className="reset-card">
                <h2>Reset Password</h2>
                <p>Enter a new password for your account.</p>

                <form onSubmit={handleResetPassword}>
                    <label>New password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label>Confirm password</label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Resetting..." : "Reset password"}
                    </button>
                </form>

                <div className="login-link">
                    <Link to="/login" className="login-link-btn">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default ResetPassWord;