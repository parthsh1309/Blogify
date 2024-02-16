import express from "express";
const router = express.Router();
import currentUser from "../controllers/currentUser.js";

router.get("/getCurrentUser",currentUser);

export default router;
