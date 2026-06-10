import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

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
            <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
                <h2>Google login failed</h2>
                <p>Login token from Google not found.</p>
                <Link to="/login">Back to Login</Link>
            </main>
        );
    }

    return (
        <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
            <h2>Logging in...</h2>
            <p>Please wait a moment.</p>
        </main>
    );
}

export default OAuth2CallbackPage;
