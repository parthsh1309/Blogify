import express from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import getUserBlogs from "../../controllers/dashboard/userBlogs.js";
import userLikedBlogs from "../../controllers/dashboard/userLikedBlogs.js";

const router = express.Router();

router.get("/userBlogs", verifyJWT, getUserBlogs);

router.get("/userLikedBlogs", verifyJWT, userLikedBlogs);

export default router;
