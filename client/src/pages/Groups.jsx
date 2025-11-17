import React, { useEffect, useState } from "react";
import api from "../api";
import { getCurrentUserId } from "../authHelper";


export default function Groups() {
    const userId = getCurrentUserId();


  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    async function load() {
      const data = await api.getGroups(userId);
      setGroups(data);
    }
    load();
  }, []);

  async function addGroup() {
    if (!name || !subject) return;

    const group = await api.addGroup({
      userId,
      name,
      subject,
      messages: [],
    });

    setGroups([...groups, group]);
    setName("");
    setSubject("");
  }

  async function deleteGroup(id) {
    await api.deleteGroup(id);
    setGroups(groups.filter((g) => g._id !== id));
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <h2>Study Groups</h2>
        <p className="page-sub">Create or join study circles.</p>
      </div>

      <div className="page-layout">
        <div className="page-form">
          <h3>Create Group</h3>

          <input
            placeholder="Group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Subject or topic"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <button className="btn primary" onClick={addGroup}>
            Add Group
          </button>
        </div>

        <div className="page-list">
          {groups.length === 0 ? (
            <div className="empty-state">No groups created yet</div>
          ) : (
            <ul className="group-list">
              {groups.map((g) => (
                <li key={g._id} className="group-item">
                  <div>
                    <h4>{g.name}</h4>
                    <p>{g.subject}</p>
                  </div>

                  <button onClick={() => deleteGroup(g._id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
