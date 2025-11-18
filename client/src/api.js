const API_URL = "https://studo-qa4p.onrender.com/api";

function getHeaders() {
  const token = localStorage.getItem("studoToken");

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : ""
  };
}

async function request(path, method = "GET", body) {
  const options = { method, headers: getHeaders() };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(API_URL + path, options);
  return res.json();
}

export default {
  // Auth
  signup: (data) => request("/auth/signup", "POST", data),
  login: (data) => request("/auth/login", "POST", data),

  // Notes
  getNotes: (userId) => request(`/notes/${userId}`),
  addNote: (data) => request("/notes", "POST", data),
  deleteNote: (id) => request(`/notes/${id}`, "DELETE"),

  // Tasks
  getTasks: (userId) => request(`/tasks/${userId}`),
  addTask: (data) => request("/tasks", "POST", data),
  deleteTask: (id) => request(`/tasks/${id}`, "DELETE"),

  // Groups
  getGroups: (userId) => request(`/groups/${userId}`),
  addGroup: (data) => request("/groups", "POST", data),
  deleteGroup: (id) => request(`/groups/${id}`, "DELETE"),

  // Events
  getEvents: (userId) => request(`/events/${userId}`),
  addEvent: (data) => request("/events", "POST", data),
  deleteEvent: (id) => request(`/events/${id}`, "DELETE"),
};
