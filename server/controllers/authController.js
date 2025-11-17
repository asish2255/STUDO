import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.create({ email, password: hash });

    res.json({ message: "Signup successful" });
  } catch (error) {
    res.json({ error: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ message: "Login ok", token, userId: user._id });
  } catch (error) {
    res.json({ error: "Login failed" });
  }
};
