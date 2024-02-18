import express from "express";
import logout from "../../controllers/auth/logout.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.post('/logout',verifyJWT,logout)

export default router;
