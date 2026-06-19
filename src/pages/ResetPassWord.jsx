import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../services/authService";
import logo from "../assets/images/logo-login.png";
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
                <div className="auth-flow-brand">
                    <img src={logo} alt="ScienceTrend Hub logo" />
                    <div>
                        <strong>ScienceTrend Hub</strong>
                        <span>Password reset</span>
                    </div>
                </div>

                <div className="reset-header">
                    <h2>Reset Password</h2>
                    <p>Enter a new password for your account.</p>
                </div>

                <form className="reset-form" onSubmit={handleResetPassword}>
                    <label htmlFor="newPassword">New password</label>
                    <input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button className="reset-btn" type="submit" disabled={loading}>
                        {loading ? "Resetting..." : "Reset password"}
                    </button>
                </form>

                <div className="reset-login-link">
                    <Link to="/login" className="login-link-btn">
                        Back to Login
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default ResetPassWord;
