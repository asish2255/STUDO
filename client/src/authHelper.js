export function getCurrentUser() {
  try {
    const raw = localStorage.getItem("studoUser");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getCurrentUserId() {
  const user = getCurrentUser();
  // backend returns _id
  return user?._id || user?.id || "demoUser";
}

export function logoutUser() {
  localStorage.removeItem("studoUser");
  localStorage.removeItem("studoToken");
}
