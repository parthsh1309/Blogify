import express from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import getUserBlogs from "../../controllers/dashboard/userBlogs.js";
import userLikedBlogs from "../../controllers/dashboard/userLikedBlogs.js";

const router = express.Router();

router.get("/getUserBlogs", verifyJWT, getUserBlogs);

router.get("/getUserLikedBlogs", verifyJWT, userLikedBlogs);

export default router;
