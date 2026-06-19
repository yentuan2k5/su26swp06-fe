import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/images/logo-login.png";
import "../styles/AuthStatusPage.css";

function OAuth2CallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            navigate("/dashboard", { replace: true });
        }
    }, [token, navigate]);

    if (!token) {
        return (
            <main className="auth-status-page">
                <section className="auth-status-card">
                    <img src={logo} alt="ScienceTrend Hub logo" />
                    <span className="auth-status-kicker">Authentication</span>
                    <h2>Google login failed</h2>
                    <p>Login token from Google was not found. Please return to sign in again.</p>
                    <Link to="/login">Back to Login</Link>
                </section>
            </main>
        );
    }

    return (
        <main className="auth-status-page">
            <section className="auth-status-card">
                <img src={logo} alt="ScienceTrend Hub logo" />
                <span className="auth-status-kicker">Authentication</span>
                <h2>Logging in...</h2>
                <p>Please wait a moment while your workspace is prepared.</p>
            </section>
        </main>
    );
}

export default OAuth2CallbackPage;
