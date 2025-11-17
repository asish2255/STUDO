import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🍃 MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}
connectDB();

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import groupsRoutes from "./routes/groupsRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";

// Route Mapping
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/events", eventsRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Studo Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
