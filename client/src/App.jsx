import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./AuthContext"; 
import ProtectedRoute from "./ProtectedRoute";

import Navbar from "./components/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks";
import Groups from "./pages/Groups";
import Events from "./pages/Events";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* ----------- PUBLIC ROUTES ----------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ----------- PROTECTED ROUTES ----------- */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <Groups />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
