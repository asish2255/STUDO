import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ---- SIGNUP ----
  const signup = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) return { success: false, message: data.message };

      // Save user & token
      localStorage.setItem("studo_user", JSON.stringify(data));
      setUser(data);

      return { success: true };
    } catch (err) {
      return { success: false, message: "Signup failed" };
    }
  };

  // ---- LOGIN ----
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) return { success: false, message: data.message };

      localStorage.setItem("studo_user", JSON.stringify(data));
      setUser(data);

      return { success: true };
    } catch (err) {
      return { success: false, message: "Login failed" };
    }
  };

  // ---- LOGOUT ----
  const logout = () => {
    localStorage.removeItem("studo_user");
    setUser(null);
  };

  // ---- Load user from LocalStorage ----
  useEffect(() => {
    const saved = localStorage.getItem("studo_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
