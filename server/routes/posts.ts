import express from "express";
//import { signin, signup } from "../controllers/users";
import {
  createPost,
  getAllPosts,
  updatePost,
  updatePostAvatar,
} from "../controllers/posts";
import auth from "../middleware/auth";
const router = express.Router();

//router.post("/signin", signin);
router.get("/", getAllPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.post("/avatar", auth, updatePostAvatar);

export default router;
