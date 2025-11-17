import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Get notes
router.get("/:userId", async (req, res) => {
  const notes = await Note.find({ userId: req.params.userId });
  res.json(notes);
});

// Add note
router.post("/", async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
});

// Delete note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

export default router;
