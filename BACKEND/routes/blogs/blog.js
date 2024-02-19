import express from "express";

import {verifyJWT} from "../../middlewares/auth.middleware.js";
import createBlog from "../../controllers/blogs/addBlog.js";
import displayAllBlogs from "../../controllers/blogs/allBlogs.js";
import displaySingleBlog from "../../controllers/blogs/singleBlog.js";

const router = express.Router();

router.post("/create-blog",verifyJWT, createBlog);

router.get("/all-blogs", displayAllBlogs);

router.get("/blog/:blogId", displaySingleBlog);

export default router;
