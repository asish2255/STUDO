import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: String,
  text: String,
  dueDate: String,
  status: { type: String, default: "todo" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Task", taskSchema);
