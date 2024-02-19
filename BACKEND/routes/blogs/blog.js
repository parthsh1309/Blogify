import express from "express";

import {verifyJWT} from "../../middlewares/auth.middleware.js";
import createBlog from "../../controllers/blogs/addBlog.js";
import displayAllBlogs from "../../controllers/blogs/allBlogs.js";

const router = express.Router();

router.post("/create-blog",verifyJWT, createBlog);

router.get("/all-blogs", displayAllBlogs);

export default router;
