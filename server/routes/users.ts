import express from "express";
//import { signin, signup } from "../controllers/users";
import {
  signup,
  signin,
  editProfileImg,
  editUserDetails,
  fetchSingleUser,
  fetchAllUsers,
  followUser,
  fetchUserCommentInfo,
} from "../controllers/users";
import auth from "../middleware/auth";
const router = express.Router();

//router.post("/signin", signin);
router.post("/", auth, editUserDetails);
router.get("/:id/:action/:skip", fetchAllUsers);
router.post("/follow/:id", auth, followUser);
router.post("/single", fetchSingleUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/comment/:id", fetchUserCommentInfo);
router.patch("/:id/profileImg", auth, editProfileImg);

export default router;
