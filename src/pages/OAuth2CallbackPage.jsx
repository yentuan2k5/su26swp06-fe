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
                <p>Không tìm thấy token đăng nhập từ Google.</p>
                <Link to="/login">Quay lại Login</Link>
            </main>
        );
    }

    return (
        <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
            <h2>Đang đăng nhập...</h2>
            <p>Vui lòng chờ một chút.</p>
        </main>
    );
}

export default OAuth2CallbackPage;
