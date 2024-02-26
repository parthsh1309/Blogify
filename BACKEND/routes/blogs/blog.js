import express from "express";
import multer from "multer";

import { verifyJWT } from "../../middlewares/auth.middleware.js";

import createBlog from "../../controllers/blogs/addBlog.js";
import displayAllBlogs from "../../controllers/blogs/allBlogs.js";
import displaySingleBlog from "../../controllers/blogs/singleBlog.js";
import deleteBlog from "../../controllers/blogs/deleteBlog.js";
import blogComment from "../../controllers/blogs/blogComment.js";
import likeBlog from "../../controllers/blogs/likeBlog.js";
import deleteBlogComment from "../../controllers/blogs/deleteComment.js";
import getBlogComments from "../../controllers/blogs/getBlogComments.js";
const router = express.Router();

import path from "path";

// Define the destination directory
const destinationDirectory = path.resolve( './../uploads');

import fs from "fs";
if (!fs.existsSync(destinationDirectory)) {
  fs.mkdirSync(destinationDirectory, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create multer instance
const upload = multer({ storage });


router.post(
  "/create-blog",
  upload.single("coverImage"),
  verifyJWT,
  createBlog
);

router.get("/all-blogs", displayAllBlogs);

router.get("/blog/:blogId", displaySingleBlog);

router.delete("/delete-blog/:blogId", verifyJWT, deleteBlog);

router.post("/blog-comment/:blogId", verifyJWT, blogComment);

router.delete("/delete-comment/:commentId", verifyJWT, deleteBlogComment);

router.get("/get-comments/:blogId", getBlogComments);

router.post("/like-blog/:blogId", verifyJWT, likeBlog);

export default router;
