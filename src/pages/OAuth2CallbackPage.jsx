import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/images/logo-login.png";
import { useAuth } from "../context/useAuth";
import { ROUTE_PATHS } from "../routes/routePaths";
import { getDefaultAuthenticatedPath, saveOAuthSessionFromQuery } from "../utils/authStorage";
import "../styles/AuthStatusPage.css";

function OAuth2CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshAuthState } = useAuth();
  const token =
    searchParams.get("token") ||
    searchParams.get("accessToken") ||
    searchParams.get("jwt");

  useEffect(() => {
    if (!token) return;

    try {
      const session = saveOAuthSessionFromQuery(searchParams);
      refreshAuthState();
      navigate(getDefaultAuthenticatedPath(session.user.role), { replace: true });
    } catch (error) {
      console.error("Google login failed", error);
      navigate(ROUTE_PATHS.LOGIN, { replace: true });
    }
  }, [token, searchParams, navigate, refreshAuthState]);

  if (!token) {
    return (
      <main className="auth-status-page">
        <section className="auth-status-card">
          <img src={logo} alt="ScienceTrend Hub logo" />
          <span className="auth-status-kicker">Authentication</span>
          <h2>Google login failed</h2>
          <p>Login token from Google was not found. Please return to sign in again.</p>
          <Link to={ROUTE_PATHS.LOGIN}>Back to Login</Link>
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
