import mongoose from "mongoose";

// Schema is a mongoose data structure
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  privacy: { type: String, default: "everyone", required: true },
  profile_cloudinary: { type: String },
  profile_cloudinary_id: { type: String },
  background_cloudinary: { type: String },
  background_cloudinary_id: { type: String },
  bio: { type: String, default: "Hi! I'm new to Vagabond Connect!" },
  followers: { type: [String] },
  following: { type: [String] },
  messages: {
    type: [
      {
        createdAt: { type: Date, default: new Date() },
        messageOwnerId: String,
        message: String,
      },
    ],
    default: [],
  },
  notifications: { type: [] },
  favoriteCountries: { type: [String] },
  visitedCountries: { type: [String] },
});

export default mongoose.model("users", userSchema);
