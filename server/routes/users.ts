import express from "express";
//import { signin, signup } from "../controllers/users";
import { testSignup } from "../controllers/testUsers";
const router = express.Router();

//router.post("/signin", signin);
router.post("/signup", testSignup);

export default router;
