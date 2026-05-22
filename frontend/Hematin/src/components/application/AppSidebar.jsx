import { NavLink, useNavigate } from "react-router-dom";

import Logo from "../../assets/logo.png";

const AppSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");

  };

  return (
    <aside className="app-sidebar">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="sidebar-header">

          <img
            src={Logo}
            alt="logo"
            className="sidebar-logo"
          />

          <div>

            <h3>Hematin</h3>

            <p>
              Money Management
            </p>

          </div>

        </div>

        {/* MENU */}
        <div className="sidebar-menu">

          <NavLink
            to="/dashboard"
            className="sidebar-link"
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/wallets"
            className="sidebar-link"
          >
            💳 Wallets
          </NavLink>

          <NavLink
            to="/transactions"
            className="sidebar-link"
          >
            📋 Transactions
          </NavLink>

          <NavLink
            to="/budgets"
            className="sidebar-link"
          >
            💸 Budgets
          </NavLink>

          <NavLink
            to="/reports"
            className="sidebar-link"
          >
            📑 Reports
          </NavLink>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="sidebar-bottom">

        <button className="sidebar-footer-btn">
          ❔ Help Center
        </button>

        <button
          className="sidebar-footer-btn logout-btn"
          onClick={handleLogout}
        >
          ↪ Logout
        </button>

      </div>

    </aside>
  );
};

export default AppSidebar;