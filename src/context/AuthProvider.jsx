import { useCallback, useMemo, useState } from "react";
import AuthContext from "./AuthContext";
import {
  clearAuthSession,
  formatRoleForDisplay,
  getDefaultAuthenticatedPath,
  getStoredRole,
  getStoredRoles,
  getToken,
  isAdmin,
  readStoredUser,
  saveAuthSession,
} from "../utils/authStorage";

function buildAuthState() {
  const user = readStoredUser();
  const roles = getStoredRoles();
  const role = getStoredRole();
  const token = getToken();

  return {
    token,
    user,
    role,
    roles,
    isLoggedIn: Boolean(token),
    isAdminUser: isAdmin(),
  };
}

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => buildAuthState());

  const refreshAuthState = useCallback(() => {
    const nextState = buildAuthState();
    setAuthState(nextState);
    return nextState;
  }, []);

  const loginUser = useCallback(
    (response, fallbackUser = {}) => {
      const session = saveAuthSession(response, fallbackUser);
      refreshAuthState();
      return session;
    },
    [refreshAuthState],
  );

  const logoutUser = useCallback(() => {
    clearAuthSession();
    refreshAuthState();
  }, [refreshAuthState]);

  const value = useMemo(
    () => ({
      ...authState,
      displayRole: formatRoleForDisplay(authState.role),
      defaultPath: getDefaultAuthenticatedPath(authState.role),
      loginUser,
      logoutUser,
      refreshAuthState,
    }),
    [authState, loginUser, logoutUser, refreshAuthState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
