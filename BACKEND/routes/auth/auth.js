import express from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

import createUser from "../../controllers/auth/signup.js";
import refreshAccessToken from "../../controllers/auth/refreshAccessToken.js";
import login from "../../controllers/auth/login.js";
import logout from "../../controllers/auth/logout.js";
import currentUser from "../../controllers/auth/currentUser.js";
import editProfile from "../../controllers/auth/editProfile.js";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", login);

router.post("/logout", verifyJWT, logout);

router.post("/refreshToken", refreshAccessToken);

router.get("/getCurrentUser", verifyJWT, currentUser);

router.put("/editProfile/:uuid", verifyJWT, editProfile);

export default router;
