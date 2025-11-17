// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [stats, setStats] = useState({
    notes: 0,
    tasks: 0,
    groups: 0,
    events: 0,
  });

  useEffect(() => {
    try {
      const notes = JSON.parse(localStorage.getItem("studo_notes") || "[]");
      const tasks = JSON.parse(localStorage.getItem("studo_tasks") || "[]");
      const groups = JSON.parse(localStorage.getItem("studo_groups") || "[]");
      const events = JSON.parse(localStorage.getItem("studo_events") || "[]");
      setStats({
        notes: notes.length,
        tasks: tasks.length,
        groups: groups.length,
        events: events.length,
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="page-shell">
      <div className="page-header">
        <h2>Your Profile</h2>
        <p className="page-sub">A quick summary of your activity in Studo.</p>
      </div>

      <div className="panels">
        <div className="panel">
          <h3>Notes</h3>
          <p>You’ve created {stats.notes} notes.</p>
        </div>
        <div className="panel">
          <h3>Tasks</h3>
          <p>You’re tracking {stats.tasks} tasks.</p>
        </div>
        <div className="panel">
          <h3>Groups</h3>
          <p>You are in {stats.groups} study groups.</p>
        </div>
        <div className="panel">
          <h3>Events</h3>
          <p>You’ve added {stats.events} events.</p>
        </div>
      </div>
    </div>
  );
}
