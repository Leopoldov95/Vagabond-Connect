import mongoose from "mongoose";

// Schema is a mongoose data structure
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  friends: { type: [String] },
  id: { type: String },
  messages: { type: [] },
  notifications: { type: [] },
});

export default mongoose.model("users", userSchema);
