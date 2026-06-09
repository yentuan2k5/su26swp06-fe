import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PapersPage from "../pages/PapersPage";
import TrendsPage from "../pages/TrendsPage";
import LibraryPage from "../pages/LibraryPage";
import NotificationsPage from "../pages/NotificationsPage";
import ReportsPage from "../pages/ReportsPage";
import AdminPage from "../pages/AdminPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPassWordPage from "../pages/ForgotPassWordPage";
import ResetPassWord from "../pages/ResetPassWord";
import OAuth2CallbackPage from "../pages/OAuth2CallbackPage";

import { ROUTE_PATHS } from "./routePaths";

function AppRoutes() {
    return (
        <Routes>
            <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
            <Route path={ROUTE_PATHS.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTE_PATHS.PAPERS} element={<PapersPage />} />
            <Route path={ROUTE_PATHS.TRENDS} element={<TrendsPage />} />
            <Route path={ROUTE_PATHS.LIBRARY} element={<LibraryPage />} />
            <Route path={ROUTE_PATHS.NOTIFICATIONS} element={<NotificationsPage />} />
            <Route path={ROUTE_PATHS.REPORTS} element={<ReportsPage />} />
            <Route path={ROUTE_PATHS.ADMIN} element={<AdminPage />} />
            <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<ForgotPassWordPage />} />
            <Route path={ROUTE_PATHS.RESET_PASSWORD} element={<ResetPassWord />} />
            <Route path={ROUTE_PATHS.OAUTH2_CALLBACK} element={<OAuth2CallbackPage />} />
        </Routes>
    );
}

export default AppRoutes;