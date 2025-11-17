import React, { useEffect, useState } from "react";
import api from "../api";
import { getCurrentUserId } from "../authHelper";


export default function Events() {
    const userId = getCurrentUserId();


  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function load() {
      const data = await api.getEvents(userId);
      setEvents(data);
    }
    load();
  }, []);

  async function addEvent() {
    if (!title || !date) return;

    const event = await api.addEvent({
      userId,
      title,
      date,
      label: "important",
    });

    setEvents([...events, event]);
    setTitle("");
    setDate("");
  }

  async function deleteEvent(id) {
    await api.deleteEvent(id);
    setEvents(events.filter((e) => e._id !== id));
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <h2>Events</h2>
        <p className="page-sub">Track campus or study events.</p>
      </div>

      <div className="page-layout single-column">
        <div className="page-form">
          <h3>Create Event</h3>

          <input
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="btn primary" onClick={addEvent}>
            Add Event
          </button>
        </div>

        <div className="page-list">
          {events.length === 0 ? (
            <div className="empty-state">No events yet</div>
          ) : (
            <ul className="event-list">
              {events.map((ev) => (
                <li key={ev._id}>
                  <span>
                    <strong>{ev.title}</strong> — {ev.date}
                  </span>
                  <button onClick={() => deleteEvent(ev._id)}>✕</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
