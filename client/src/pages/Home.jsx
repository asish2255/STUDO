import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* TOP ROW: GREETING + SMALL SUMMARY CARD */}
      <section className="hero">
        <div className="hero-left">
          <p className="eyebrow">Today</p>
          <h1 className="hero-title">Your study hub, at a glance.</h1>
          <p className="hero-desc">
            Check what needs your attention today — notes to revise, tasks to
            finish, groups to sync with and upcoming events.
          </p>
        </div>

        <div className="hero-right" aria-hidden>
          <div className="summary-card">
            <h3>Today at a glance</h3>
            <ul>
              <li>
                <span>📘 Notes to review</span>
                <strong>3</strong>
              </li>
              <li>
                <span>✅ Tasks due</span>
                <strong>2</strong>
              </li>
              <li>
                <span>🎉 Upcoming events</span>
                <strong>1</strong>
              </li>
            </ul>
            <p className="summary-foot">You’re on track. Keep going 💪</p>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="quick-actions">
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
      </section>

      {/* OVERVIEW CARDS (CLICKABLE) */}
      <section className="overview">
        <h2>Your overview</h2>
        <p className="section-desc">
          A snapshot of your workspace — notes, tasks, groups and events.
        </p>

        <div className="overview-grid">
          <div
            className="ov-card"
            role="button"
            onClick={() => navigate("/notes")}
          >
            <div className="ov-icon">📘</div>
            <div className="ov-main">
              <h3>Notes</h3>
              <p>Organize ideas & study materials.</p>
            </div>
            <span className="ov-count">12</span>
          </div>

          <div
            className="ov-card"
            role="button"
            onClick={() => navigate("/tasks")}
          >
            <div className="ov-icon">✅</div>
            <div className="ov-main">
              <h3>Tasks</h3>
              <p>Track assignments & daily goals.</p>
            </div>
            <span className="ov-count">5 due</span>
          </div>

          <div
            className="ov-card"
            role="button"
            onClick={() => navigate("/groups")}
          >
            <div className="ov-icon">👥</div>
            <div className="ov-main">
              <h3>Groups</h3>
              <p>Join study circles & collaborate.</p>
            </div>
            <span className="ov-count">3</span>
          </div>

          <div
            className="ov-card"
            role="button"
            onClick={() => navigate("/events")}
          >
            <div className="ov-icon">🎉</div>
            <div className="ov-main">
              <h3>Events</h3>
              <p>Stay updated with campus happenings.</p>
            </div>
            <span className="ov-count">2</span>
          </div>
        </div>
      </section>

      {/* PANELS: TASKS + EVENTS PREVIEW */}
      <section className="panels">
        <div className="panel">
          <h3>Upcoming tasks</h3>
          <ul>
            <li>
              <span>Revise DBMS unit 3</span>
              <span className="tag soon">Today</span>
            </li>
            <li>
              <span>Complete OS assignment</span>
              <span className="tag">Tomorrow</span>
            </li>
            <li>
              <span>Group project meeting</span>
              <span className="tag light">Friday</span>
            </li>
          </ul>
        </div>

        <div className="panel">
          <h3>Upcoming events</h3>
          <ul>
            <li>
              <span>AI workshop</span>
              <span className="tag">21 Nov</span>
            </li>
            <li>
              <span>Mock interview session</span>
              <span className="tag light">24 Nov</span>
            </li>
            <li>
              <span>Semester exam timetable</span>
              <span className="tag">Soon</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
