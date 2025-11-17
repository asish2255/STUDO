import React, { useState, useEffect } from "react";
import api from "../api";
import { getCurrentUserId } from "../authHelper";

export default function Tasks() {
  const userId = getCurrentUserId();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Load tasks on page open
  useEffect(() => {
    async function load() {
      const data = await api.getTasks(userId);
      setTasks(data || []);
    }
    if (userId) load();
  }, [userId]);

  // Add Task
  async function addTask() {
    if (!title.trim() || !dueDate) return;

    const newTask = await api.addTask({
      userId,
      title: title.trim(),
      dueDate,
      status: "pending",
    });

    setTasks([...tasks, newTask]);
    setTitle("");
    setDueDate("");
  }

  // Delete Task (also used as "complete")
  async function deleteTask(id) {
    await api.deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  }

  // Edit Task (delete + re-add)
  async function editTask(task) {
    const newTitle = window.prompt("Edit task", task.title);
    if (newTitle === null) return;

    const newDue = window.prompt("Edit due date (YYYY-MM-DD)", task.dueDate);
    if (newDue === null) return;

    await api.deleteTask(task._id);
    const updated = await api.addTask({
      userId,
      title: newTitle.trim(),
      dueDate: newDue,
      status: task.status || "pending",
    });

    setTasks(tasks.map((t) => (t._id === task._id ? updated : t)));
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <h2>Tasks</h2>
        <p className="page-sub">Track your daily study tasks.</p>
      </div>

      <div className="page-layout">
        {/* LEFT SIDE – ADD TASK */}
        <div className="page-form">
          <h3>Add Task</h3>

          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button className="btn primary" onClick={addTask}>
            Save Task
          </button>
        </div>

        {/* RIGHT SIDE – TASK LIST */}
        <div className="page-list">
          {tasks.length === 0 ? (
            <div className="empty-state">No tasks yet 🙂</div>
          ) : (
            <div className="card-grid">
              {tasks.map((task) => (
                <div key={task._id} className="note-card">
                  <h4>{task.title}</h4>
                  <p>Due: {task.dueDate}</p>

                  <div className="card-actions">
                    <button onClick={() => editTask(task)}>Edit</button>
                    <button onClick={() => deleteTask(task._id)}>
                      Mark Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
