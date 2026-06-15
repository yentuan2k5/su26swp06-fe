import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/routePaths";
import "./layout.css";

function Navbar({
  title = "Dashboard",
  subtitle = "Welcome back to ScienceTrend Hub",
}) {
  const navigate = useNavigate();
  const accountRef = useRef(null);
  const [openAccount, setOpenAccount] = useState(false);

  let savedUser;

  try {
    savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    savedUser = {};
  }

  const userName =
    savedUser.username ||
    savedUser.name ||
    savedUser.email ||
    "Researcher";

  const userRole =
    savedUser.role ||
    "Research Member";

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setOpenAccount(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleNotificationClick() {
    navigate(ROUTE_PATHS.NOTIFICATIONS);
  }

  function handleAccountClick() {
    setOpenAccount((prev) => !prev);
  }

  function handleGoToAccount() {
    setOpenAccount(false);
    navigate(ROUTE_PATHS.ADMIN);
  }

  function handleGoToLibrary() {
    setOpenAccount(false);
    navigate(ROUTE_PATHS.LIBRARY);
  }

  function handleGoToReports() {
    setOpenAccount(false);
    navigate(ROUTE_PATHS.REPORTS);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    navigate(ROUTE_PATHS.LOGIN);
  }

  return (
    <header className="st-navbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="st-navbar-right">
        <div className="st-search-box">
          <input type="text" placeholder="Search papers, journals, topics..." />
        </div>

        <button
          type="button"
          className="st-notification-btn"
          onClick={handleNotificationClick}
        >
          🔔
          <span></span>
        </button>

        <div className="st-account-wrapper" ref={accountRef}>
          <button
            type="button"
            className="st-user-box"
            onClick={handleAccountClick}
          >
            <div className="st-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="st-user-info">
              <h4>{userName}</h4>
              <span>{userRole}</span>
            </div>

            <div className={`st-account-arrow ${openAccount ? "open" : ""}`}>
              ▾
            </div>
          </button>

          {openAccount && (
            <div className="st-account-dropdown">
              <button type="button" onClick={handleGoToAccount}>
                👤 My Account
              </button>

              <button type="button" onClick={handleGoToLibrary}>
                📚 My Library
              </button>

              <button type="button" onClick={handleGoToReports}>
                📄 Reports
              </button>

              <div className="st-dropdown-line"></div>

              <button
                type="button"
                className="st-logout-btn"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;