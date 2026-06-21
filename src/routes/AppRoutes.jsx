import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import AdminPage from "../pages/AdminPage";
import DashboardPage from "../pages/DashboardPage";
import ForgotPassWordPage from "../pages/ForgotPassWordPage";
import HomePage from "../pages/HomePage";
import LibraryPage from "../pages/LibraryPage";
import LoginPage from "../pages/LoginPage";
import NotificationsPage from "../pages/NotificationsPage";
import OAuth2CallbackPage from "../pages/OAuth2CallbackPage";
import PapersPage from "../pages/PapersPage";
import RegisterPage from "../pages/RegisterPage";
import ReportsPage from "../pages/ReportsPage";
import ResetPassWord from "../pages/ResetPassWord";
import TrendsPage from "../pages/TrendsPage";
import { ROUTE_PATHS } from "./routePaths";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  return children;
}

function PublicOnlyRoute({ children }) {
  const { isLoggedIn, defaultPath } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={defaultPath} replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { isLoggedIn, isAdminUser } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  if (!isAdminUser) {
    return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
  }

  return children;
}

function AppRoutes() {
  const { isLoggedIn, defaultPath } = useAuth();

  return (
    <Routes>
      <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />

      <Route
        path={ROUTE_PATHS.LOGIN}
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path={ROUTE_PATHS.REGISTER}
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />
      <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<ForgotPassWordPage />} />
      <Route path={ROUTE_PATHS.RESET_PASSWORD} element={<ResetPassWord />} />
      <Route path={ROUTE_PATHS.OAUTH2_CALLBACK} element={<OAuth2CallbackPage />} />

      <Route
        path={ROUTE_PATHS.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATHS.PAPERS}
        element={
          <ProtectedRoute>
            <PapersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATHS.TRENDS}
        element={
          <ProtectedRoute>
            <TrendsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATHS.LIBRARY}
        element={
          <ProtectedRoute>
            <LibraryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATHS.NOTIFICATIONS}
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATHS.REPORTS}
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE_PATHS.ADMIN}
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? defaultPath : ROUTE_PATHS.HOME} replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
