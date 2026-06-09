import { apiRequest } from "./api";

export function login({ username, password }) {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
}

export function register({ username, email, password, confirmPassword, role }) {
    return apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
            confirmPassword,
            role,
        }),
    });
}

export function forgotPassword(identifier) {
    return apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ identifier }),
    });
}

export function resetPassword(token, newPassword, confirmPassword) {
    return apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
            token,
            newPassword,
            confirmPassword,
        }),
    });
}

export function refreshToken(refreshTokenValue) {
    return apiRequest("/auth/refresh-token", {
        method: "POST",
        body: JSON.stringify({ refreshToken: refreshTokenValue }),
    });
}

export function logout(refreshTokenValue) {
    return apiRequest("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken: refreshTokenValue }),
    });
}
