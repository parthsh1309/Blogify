import express from "express";

import createBlog from "../../controllers/blogs/addBlog.js";
import {verifyJWT} from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-blog",verifyJWT, createBlog);

export default router;
