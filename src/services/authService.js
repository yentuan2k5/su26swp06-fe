import { apiRequest } from "./api";

export function login({ username, password }) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: { username, password },
    auth: false,
  });
}

export function register({ username, email, password, confirmPassword, role }) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: {
      username,
      email,
      password,
      confirmPassword,
      role,
    },
    auth: false,
  });
}

export function forgotPassword(email) {
  return apiRequest("/auth/forgot-password", {
    method: "POST",
    body: { email },
    auth: false,
  });
}

export function resetPassword(token, newPassword, confirmPassword) {
  return apiRequest("/auth/reset-password", {
    method: "POST",
    body: {
      token,
      newPassword,
      confirmPassword,
    },
    auth: false,
  });
}

export function refreshToken(refreshTokenValue) {
  return apiRequest("/auth/refresh-token", {
    method: "POST",
    body: { refreshToken: refreshTokenValue },
    auth: false,
  });
}

export function logout(refreshTokenValue) {
  return apiRequest("/auth/logout", {
    method: "POST",
    body: { refreshToken: refreshTokenValue },
  });
}
