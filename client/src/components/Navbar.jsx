import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const [dark, setDark] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle("darkmode", dark);
  }, [dark]);

  useEffect(() => {
    try {
      const tasks = JSON.parse(localStorage.getItem("studo_tasks") || "[]");
      const events = JSON.parse(localStorage.getItem("studo_events") || "[]");

      const notifList = [];

      tasks.slice(0, 3).forEach((t) =>
        notifList.push({
          type: "task",
          text: `Task: ${t.text || t.title || "Untitled"} (due ${t.due})`,
        })
      );

      events.slice(0, 3).forEach((e) =>
        notifList.push({
          type: "event",
          text: `Event: ${e.title} (${e.date})`,
        })
      );

      setNotifications(notifList);
    } catch {
      setNotifications([]);
    }
  }, []);

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          <span className="brand-pill" />
          <span className="brand-text">Studo</span>
        </Link>
      </div>

      <nav className="nav-right">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            "nav-link" + (isActive ? " nav-link-active" : "")
          }
        >
          Dashboard
        </NavLink>

        <div className="notif-wrapper">
          <button
            type="button"
            className="notif-toggle"
            onClick={() => setShowNotif((v) => !v)}
          >
            🔔
          </button>
          {showNotif && (
            <div className="notif-panel">
              <h4>Notifications</h4>
              {notifications.length === 0 ? (
                <p className="notif-empty">You’re all caught up ✨</p>
              ) : (
                <ul>
                  {notifications.map((n, idx) => (
                    <li key={idx}>{n.text}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <button
          className="theme-toggle"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {!user ? (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        ) : (
          <button className="login-btn" onClick={logout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
