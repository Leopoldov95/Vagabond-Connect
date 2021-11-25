import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ownerId: { type: String, required: true },
  imageURL: { type: String, required: true },
  cloudinary_id: { type: String },
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
