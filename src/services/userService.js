import { apiRequest } from "./api";

export function getUsers(params = {}) {
  return apiRequest("/users", {
    method: "GET",
    params,
  });
}

export function getUserById(userId) {
  return apiRequest(`/users/${userId}`, {
    method: "GET",
  });
}

export function getCurrentUser() {
  return apiRequest("/users/me", {
    method: "GET",
  });
}

export function updateCurrentUser(payload) {
  return apiRequest("/users/me", {
    method: "PUT",
    body: payload,
  });
}

export function updateUser(userId, payload) {
  return apiRequest(`/users/${userId}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteUser(userId) {
  return apiRequest(`/users/${userId}`, {
    method: "DELETE",
  });
}

export function changePassword(payload) {
  return apiRequest("/users/change-password", {
    method: "PUT",
    body: payload,
  });
}

export function updateAvatar(file) {
  const formData = new FormData();
  formData.append("avatar", file);

  return apiRequest("/users/me/avatar", {
    method: "PUT",
    body: formData,
  });
}