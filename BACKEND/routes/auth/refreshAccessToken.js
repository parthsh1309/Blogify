import express from "express";
import refreshAccessToken from "../../controllers/auth/refreshAccessToken.js";
const router = express.Router();

router.post("/refreshToken", refreshAccessToken);

export default router;
