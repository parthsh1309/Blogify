import express from "express";
const router = express.Router();
import currentUser from "../../controllers/auth/currentUser.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

router.get("/getCurrentUser",verifyJWT,currentUser);

export default router;
