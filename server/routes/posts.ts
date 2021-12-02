import express from "express";
//import { signin, signup } from "../controllers/users";
import { createPost, getAllPosts } from "../controllers/posts";
import auth from "../middleware/auth";
const router = express.Router();

//router.post("/signin", signin);
router.get("/", getAllPosts);
router.post("/", auth, createPost);

export default router;
