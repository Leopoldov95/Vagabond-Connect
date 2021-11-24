import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ownerId: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  likes: { type: [String], default: [] },
  comments: {
    type: [
      {
        commentId: String,
        commentOwnerId: String,
        message: String,
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("posts", postSchema);
