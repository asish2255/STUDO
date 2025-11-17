import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Create JWT token
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.json({ error: "Email already exists" });

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res.json({ user, token });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) return res.json({ error: "Invalid email or password" });

    const token = generateToken(user._id);

    res.json({ user, token });
  } catch (err) {
    res.json({ error: err.message });
  }
});

export default router;
