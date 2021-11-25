import express from "express";
//import { signin, signup } from "../controllers/users";
import { testSignup, testDestroy } from "../controllers/testUsers";
//import upload from "../utils/upload";
const router = express.Router();

//router.post("/signin", signin);
router.get("/", testDestroy);
router.post("/signup", testSignup);

export default router;
