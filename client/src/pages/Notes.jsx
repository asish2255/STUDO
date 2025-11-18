import React, { useState, useEffect } from "react";
import api from "../api";
import { getCurrentUserId } from "../authHelper";
import jsPDF from "jspdf";

export default function Notes() {
  const userId = getCurrentUserId();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function load() {
      const data = await api.getNotes(userId);
      setNotes(data);
    }
    load();
  }, []);

  async function addNote() {
    if (!title || !content) return;
    const newNote = await api.addNote({ userId, title, content });
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  }

  async function deleteNote(id) {
    await api.deleteNote(id);
    setNotes(notes.filter((n) => n._id !== id));
  }

  function downloadPDF(note) {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(note.title, 10, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const splitContent = doc.splitTextToSize(note.content, 180);
    doc.text(splitContent, 10, 35);

    doc.save(`${note.title}.pdf`);
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <h2>Notes</h2>
        <p className="page-sub">Save your study notes.</p>
      </div>

      <div className="page-layout">
        {/* LEFT: FORM */}
        <div className="page-form">
          <h3>Add Note</h3>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="btn primary" onClick={addNote}>
            Save Note
          </button>
        </div>

        {/* RIGHT: LIST */}
        <div className="page-list">
          {notes.length === 0 ? (
            <div className="empty-state">No notes yet 🙁</div>
          ) : (
            <div className="card-grid">
              {notes.map((note) => (
                <div key={note._id} className="note-card">
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>

                  <div className="card-actions">
                    <button onClick={() => downloadPDF(note)}>
                      Download PDF
                    </button>

                    <button onClick={() => deleteNote(note._id)}>
                      Delete
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
