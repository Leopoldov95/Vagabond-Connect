import mongoose, { Schema } from "mongoose";

// creating a new, seperate Schema for messages as I don't want users db to be overly cluttered
const messageSchema = new mongoose.Schema(
  {
    users: { type: [String], required: true, default: [] },
    messages: {
      type: [
        {
          createdBy: String,
          createdAt: { type: Date, default: new Date() },
          message: String,
        },
      ],
      default: [],
    },
  },
  { minimize: false }
);

export default mongoose.model("message", messageSchema);

// message object will look like this:
