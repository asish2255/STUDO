// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Safe userId from AuthContext
  const userId = user?._id;

  // Dynamic state
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);

  // -------- FETCH USER DATA --------
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/notes/${userId}`)
      .then((res) => res.json())
      .then((data) => setNotes(data || []))
      .catch((err) => console.error("Notes fetch error:", err));

    fetch(`http://localhost:5000/api/tasks/${userId}`)
      .then((res) => res.json())
      .then((data) => setTasks(data || []))
      .catch((err) => console.error("Tasks fetch error:", err));

    fetch(`http://localhost:5000/api/groups/${userId}`)
      .then((res) => res.json())
      .then((data) => setGroups(data || []))
      .catch((err) => console.error("Groups fetch error:", err));

    fetch(`http://localhost:5000/api/events/${userId}`)
      .then((res) => res.json())
      .then((data) => setEvents(data || []))
      .catch((err) => console.error("Events fetch error:", err));
  }, [userId]);

  // Count tasks that are not done
  const tasksDueCount = tasks.filter((t) => t.status !== "done").length;

  return (
    <div className="home-page">
      {/* ---------------- HERO ---------------- */}
      <div className="hero">
        <div className="hero-left">
          <span className="eyebrow">Today</span>
          <h2 className="hero-title">Your study hub, at a glance.</h2>
          <p className="hero-desc">
            Check what needs your attention today — notes to revise, tasks to finish,
            groups to sync with and upcoming events.
          </p>
        </div>

        <div className="hero-right">
          <div className="summary-card">
            <h3>Today at a glance</h3>
            <ul>
              <li>
                Notes to review <strong>{notes.length}</strong>
              </li>
              <li>
                Tasks due <strong>{tasksDueCount}</strong>
              </li>
              <li>
                Upcoming events <strong>{events.length}</strong>
              </li>
            </ul>
            <p className="summary-foot">You're on track. Keep going 💪</p>
          </div>
        </div>
      </div>

      {/* ---------------- QUICK ACTIONS ---------------- */}
      <div className="quick-actions">
        <button className="qa-btn" onClick={() => navigate("/notes")}>
          <span>📝</span>
          <div>
            <h4>Capture a note</h4>
            <p>Dump your thoughts in seconds.</p>
          </div>
        </button>

        <button className="qa-btn" onClick={() => navigate("/tasks")}>
          <span>✅</span>
          <div>
            <h4>Add a task</h4>
            <p>Track your next assignment.</p>
          </div>
        </button>

        <button className="qa-btn" onClick={() => navigate("/groups")}>
          <span>👥</span>
          <div>
            <h4>Join a group</h4>
            <p>Study better with friends.</p>
          </div>
        </button>
      </div>

      {/* ---------------- OVERVIEW SECTION ---------------- */}
      <div className="overview">
        <h2>Your overview</h2>
        <p className="section-desc">
          A snapshot of your workspace — notes, tasks, groups and events.
        </p>

        <div className="overview-grid">
          {/* NOTES CARD */}
          <div className="ov-card" onClick={() => navigate("/notes")}>
            <span className="ov-icon">📘</span>
            <div className="ov-main">
              <h3>Notes</h3>
              <p>Organize ideas & study materials.</p>
            </div>
            <span className="ov-count">{notes.length}</span>
          </div>

          {/* TASKS CARD — FIXED NAVIGATION */}
          <div className="ov-card" onClick={() => navigate("/tasks")}>
            <span className="ov-icon">📝</span>
            <div className="ov-main">
              <h3>Tasks</h3>
              <p>Track daily goals & assignments.</p>
            </div>
            <span className="ov-count">{tasksDueCount}</span>
          </div>

          {/* GROUPS CARD */}
          <div className="ov-card" onClick={() => navigate("/groups")}>
            <span className="ov-icon">👥</span>
            <div className="ov-main">
              <h3>Groups</h3>
              <p>Join study circles & collaborate.</p>
            </div>
            <span className="ov-count">{groups.length}</span>
          </div>

          {/* EVENTS CARD */}
          <div className="ov-card" onClick={() => navigate("/events")}>
            <span className="ov-icon">🎉</span>
            <div className="ov-main">
              <h3>Events</h3>
              <p>Stay updated with campus happenings.</p>
            </div>
            <span className="ov-count">{events.length}</span>
          </div>
        </div>
      </div>

      {/* ---------------- PANELS ---------------- */}
      <div className="panels">

        {/* TASKS PANEL */}
        <div className="panel">
          <h3>Upcoming tasks</h3>
          <ul>
            {tasks.slice(0, 3).map((t, i) => (
              <li key={i}>
                {t.title}
                <span className="tag">{t.dueDate || "Soon"}</span>
              </li>
            ))}
            {tasks.length === 0 && <p>No tasks yet</p>}
          </ul>
        </div>

        {/* EVENTS PANEL */}
        <div className="panel">
          <h3>Upcoming events</h3>
          <ul>
            {events.slice(0, 3).map((e, i) => (
              <li key={i}>
                {e.title}
                <span className="tag light">{e.date || "Soon"}</span>
              </li>
            ))}
            {events.length === 0 && <p>No events yet</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}
