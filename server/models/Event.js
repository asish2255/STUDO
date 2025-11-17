import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: String,
  title: String,
  date: String,
  label: String,
});

export default mongoose.model("Event", eventSchema);
