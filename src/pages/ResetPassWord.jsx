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
            alert("Vui lòng nhập đầy đủ mật khẩu");
            return;
        }

        if (newPassword.length < 8) {
            alert("Mật khẩu phải có ít nhất 8 ký tự");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp");
            return;
        }

        try {
            setLoading(true);
            const res = await resetPassword(token, newPassword, confirmPassword);
            alert(res || "Đổi mật khẩu thành công");
            navigate("/login");
        } catch (error) {
            alert("Reset password thất bại: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="reset-page">
            <div className="reset-card">
                <h2>Reset Password</h2>
                <p>Nhập mật khẩu mới cho tài khoản của bạn.</p>

                <form onSubmit={handleResetPassword}>
                    <label>New password</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label>Confirm password</label>
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Đang đổi..." : "Reset password"}
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