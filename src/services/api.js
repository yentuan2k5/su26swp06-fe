const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api").replace(/\/$/, "");

function buildErrorMessage(errorBody) {
    if (!errorBody) return "Request failed";

    if (typeof errorBody === "string") return errorBody;

    if (errorBody.message) return errorBody.message;
    if (errorBody.error) return errorBody.error;

    // Spring validation errors sometimes come back as an object/map.
    return JSON.stringify(errorBody);
}

export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
        ? await res.json().catch(() => null)
        : await res.text().catch(() => "");

    if (!res.ok) {
        throw new Error(buildErrorMessage(responseBody));
    }

    return responseBody;
}
