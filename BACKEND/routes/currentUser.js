import express from "express";
const router = express.Router();
import currentUser from "../controllers/currentUser.js";

router.post("/getCurrentUser",currentUser);

export default router;
