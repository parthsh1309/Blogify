import express from "express";
const router = express.Router();
import currentUser from "../../controllers/auth/currentUser.js";

router.get("/getCurrentUser",currentUser);

export default router;
