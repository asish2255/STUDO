import express from "express";
import Group from "../models/Group.js";

const router = express.Router();

// Get groups
router.get("/:userId", async (req, res) => {
  const groups = await Group.find({ userId: req.params.userId });
  res.json(groups);
});

// Add group
router.post("/", async (req, res) => {
  const group = await Group.create(req.body);
  res.json(group);
});

// Delete group
router.delete("/:id", async (req, res) => {
  await Group.findByIdAndDelete(req.params.id);
  res.json({ message: "Group deleted" });
});

export default router;
