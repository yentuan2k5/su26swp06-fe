import { unwrapResponse } from "./apiData";

const TOKEN_KEYS = ["token", "accessToken", "jwt", "access_token", "authenticationToken"];
const REFRESH_TOKEN_KEYS = ["refreshToken", "refresh_token"];
const USER_KEY = "user";
const ADMIN_ROLE = "ADMIN";
const DEFAULT_MEMBER_ROLE = "MEMBER";

function safeJsonParse(value, fallback = null) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function decodeJwtPayload(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return {};

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );

    return JSON.parse(json);
  } catch {
    return {};
  }
}

export function normalizeRoleValue(value) {
  if (value === undefined || value === null || value === "") return "";

  if (typeof value === "string") {
    return value
      .trim()
      .replace(/^ROLE_/i, "")
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "")
      .toUpperCase();
  }

  if (typeof value === "object") {
    return normalizeRoleValue(
      value.role || value.name || value.authority || value.code || value.value,
    );
  }

  return normalizeRoleValue(String(value));
}

function collectRoles(value, roles = new Set()) {
  if (value === undefined || value === null || value === "") return roles;

  if (typeof value === "string") {
    const parts = value.split(/[\s,;]+/).filter(Boolean);

    if (parts.length > 1) {
      parts.forEach((part) => collectRoles(part, roles));
      return roles;
    }

    const normalized = normalizeRoleValue(value);
    if (normalized) roles.add(normalized);
    return roles;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectRoles(item, roles));
    return roles;
  }

  if (typeof value === "object") {
    collectRoles(value.role, roles);
    collectRoles(value.roles, roles);
    collectRoles(value.name, roles);
    collectRoles(value.authority, roles);
    collectRoles(value.authorities, roles);
    collectRoles(value.code, roles);
    collectRoles(value.value, roles);
    return roles;
  }

  const normalized = normalizeRoleValue(value);
  if (normalized) roles.add(normalized);
  return roles;
}

function pickPrimaryRole(roles = []) {
  if (roles.includes(ADMIN_ROLE)) return ADMIN_ROLE;
  return roles[0] || DEFAULT_MEMBER_ROLE;
}

function getRoleSources(user = {}, data = {}, tokenPayload = {}, fallbackUser = {}) {
  return [
    user.role,
    user.roles,
    user.authorities,
    data.role,
    data.roles,
    data.authorities,
    tokenPayload.role,
    tokenPayload.roles,
    tokenPayload.authorities,
    tokenPayload.scope,
    tokenPayload.scopes,
    fallbackUser.role,
    fallbackUser.roles,
  ];
}

function extractRolesFromSources(sources = []) {
  const roles = new Set();
  sources.forEach((source) => collectRoles(source, roles));
  return Array.from(roles);
}

export function getToken() {
  for (const key of TOKEN_KEYS) {
    const token = localStorage.getItem(key);
    if (token) return token;
  }

  return "";
}

export function getRefreshToken() {
  for (const key of REFRESH_TOKEN_KEYS) {
    const token = localStorage.getItem(key);
    if (token) return token;
  }

  return "";
}

export function readStoredUser() {
  return safeJsonParse(localStorage.getItem(USER_KEY) || "{}", {}) || {};
}

export function getStoredRoles() {
  const user = readStoredUser();
  const tokenPayload = decodeJwtPayload(getToken());
  return extractRolesFromSources(getRoleSources(user, {}, tokenPayload, {}));
}

export function getStoredRole() {
  const user = readStoredUser();
  return normalizeRoleValue(user.role) || pickPrimaryRole(getStoredRoles());
}

export function hasRole(role) {
  const targetRole = normalizeRoleValue(role);
  if (!targetRole) return false;
  return getStoredRoles().includes(targetRole) || getStoredRole() === targetRole;
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function isAdmin() {
  return hasRole(ADMIN_ROLE);
}

export function getDefaultAuthenticatedPath(roleValue = getStoredRole()) {
  const role = normalizeRoleValue(roleValue);
  return role === ADMIN_ROLE ? "/admin" : "/dashboard";
}

export function saveAuthSession(response, fallbackUser = {}) {
  const data = unwrapResponse(response) || {};

  const token =
    data.token ||
    data.accessToken ||
    data.jwt ||
    data.access_token ||
    data.authenticationToken ||
    "";

  if (!token) {
    throw new Error("Login response does not contain token");
  }

  const refreshToken = data.refreshToken || data.refresh_token || "";
  const tokenPayload = decodeJwtPayload(token);
  const responseUser = data.user || data.account || data.profile || {};
  const roles = extractRolesFromSources(
    getRoleSources(responseUser, data, tokenPayload, fallbackUser),
  );
  const primaryRole = pickPrimaryRole(roles);

  const user = {
    ...fallbackUser,
    ...responseUser,
    username:
      responseUser.username ||
      responseUser.name ||
      data.username ||
      tokenPayload.sub ||
      fallbackUser.username ||
      "",
    email: responseUser.email || data.email || tokenPayload.email || fallbackUser.email || "",
    role: primaryRole,
    roles: roles.length > 0 ? roles : [primaryRole],
  };

  localStorage.setItem("token", token);

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return { token, refreshToken, user, role: primaryRole, roles: user.roles };
}

export function saveOAuthSessionFromQuery(searchParams) {
  const token =
    searchParams.get("token") ||
    searchParams.get("accessToken") ||
    searchParams.get("jwt") ||
    "";

  if (!token) {
    throw new Error("OAuth callback does not contain token");
  }

  return saveAuthSession({
    token,
    refreshToken: searchParams.get("refreshToken") || "",
    username: searchParams.get("username") || "",
    email: searchParams.get("email") || "",
    role: searchParams.get("role") || "",
  });
}

export function clearAuthSession() {
  TOKEN_KEYS.forEach((key) => localStorage.removeItem(key));
  REFRESH_TOKEN_KEYS.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("auth");
  localStorage.removeItem("account");
  localStorage.removeItem("profile");
}

export function formatRoleForDisplay(roleValue = getStoredRole()) {
  const role = normalizeRoleValue(roleValue);

  if (!role || role === DEFAULT_MEMBER_ROLE) return "Research member";

  return role
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
