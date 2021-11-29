import express from "express";
//import { signin, signup } from "../controllers/users";
import { signup, signin, editProfileImg } from "../controllers/users";
import auth from "../middleware/auth";
const router = express.Router();

//router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/:id/profileImg", auth, editProfileImg);

export default router;
