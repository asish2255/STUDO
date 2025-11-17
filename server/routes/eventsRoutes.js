import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Get events
router.get("/:userId", async (req, res) => {
  const events = await Event.find({ userId: req.params.userId });
  res.json(events);
});

// Create event
router.post("/", async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
});

// Delete event
router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

export default router;
