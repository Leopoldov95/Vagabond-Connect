import express from "express";
//import { signin, signup } from "../controllers/users";
import {
  createPost,
  getAllPosts,
  getUsersPosts,
  updatePost,
  deletePost,
  likePost,
  createComment,
  deleteComment,
  editComment,
} from "../controllers/posts";
import auth from "../middleware/auth";
const router = express.Router();

//router.post("/signin", signin);
router.get("/:id", getAllPosts); // used for home page
router.get("/user/:id", getUsersPosts); // used for profile page
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/likepost/:id", auth, likePost);
// comment routes
router.patch("/comment/create/:id", auth, createComment);
router.patch("/comment/delete/:postId/:commentId", auth, deleteComment);
router.patch("/comment/edit/:postId/:commentId", auth, editComment);

export default router;
