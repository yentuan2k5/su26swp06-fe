import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import DashboardPage from "../pages/DashboardPage";
import ForgotPassWordPage from "../pages/ForgotPassWordPage";
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

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={ROUTE_PATHS.LOGIN} replace />}
      />
      <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
      <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />
      <Route
        path={ROUTE_PATHS.FORGOT_PASSWORD}
        element={<ForgotPassWordPage />}
      />
      <Route path={ROUTE_PATHS.RESET_PASSWORD} element={<ResetPassWord />} />
      <Route
        path={ROUTE_PATHS.OAUTH2_CALLBACK}
        element={<OAuth2CallbackPage />}
      />

      <Route path={ROUTE_PATHS.DASHBOARD} element={<DashboardPage />} />
      <Route path={ROUTE_PATHS.PAPERS} element={<PapersPage />} />
      <Route path={ROUTE_PATHS.TRENDS} element={<TrendsPage />} />
      <Route path={ROUTE_PATHS.LIBRARY} element={<LibraryPage />} />
      <Route
        path={ROUTE_PATHS.NOTIFICATIONS}
        element={<NotificationsPage />}
      />
      <Route path={ROUTE_PATHS.REPORTS} element={<ReportsPage />} />
      <Route path={ROUTE_PATHS.ADMIN} element={<AdminPage />} />

      <Route path="*" element={<Navigate to={ROUTE_PATHS.DASHBOARD} replace />} />
    </Routes>
  );
}

export default AppRoutes;
