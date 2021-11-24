import mongoose from "mongoose";

// Schema is a mongoose data structure
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  backgroundPic: { type: String },
  followers: { type: [String] },
  following: { type: [String] },
  messages: { type: [] },
  notifications: { type: [] },
  favoriteCountries: [String],
  visitedCountries: [String],
});

export default mongoose.model("users", userSchema);
