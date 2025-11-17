import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  userId: String,
  name: String,
  subject: String,
  messages: [{ text: String, time: String }]
});

export default mongoose.model("Group", groupSchema);
