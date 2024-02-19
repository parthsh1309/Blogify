import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import createBlog from "../../controllers/blogs/addBlog.js";
import displayAllBlogs from "../../controllers/blogs/allBlogs.js";
import displaySingleBlog from "../../controllers/blogs/singleBlog.js";
import deleteBlog from "../../controllers/blogs/deleteBlog.js";
import blogComment from "../../controllers/blogs/blogComment.js";

const router = express.Router();

router.post("/create-blog", verifyJWT, createBlog);

router.get("/all-blogs", displayAllBlogs);

router.get("/blog/:blogId", displaySingleBlog);

router.delete("/delete-blog/:blogId", verifyJWT, deleteBlog);

router.post("/blog-comment/:blogId", verifyJWT, blogComment);

export default router;
