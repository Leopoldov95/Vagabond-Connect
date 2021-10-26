import express, { Router } from "express";
import { getAllUsers } from "../controllers/users";
const router = express.Router();

router.get("/get/users", getAllUsers);

export = router;
