import asyncHandler from "express-async-handler";
import { ApiError } from "../../utils/apiError.js";
import Blog from "../../models/blog.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const displayAllBlogs = async (req, res) => {
  try {
    // fetch Requested blogs from the database
    const blogs = await Blog.find({
      inProduction: req.query.inProduction || false,
      category: { $in: [req.query.blogCategory||"All"] }
    })
      .limit(req.query.limit || 10)
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "-password -refreshToken -likedBlogs -savedBlogs -blogPosts"
      })
      .exec();

    // if there are no blogs
    if (!blogs || blogs.length === 0) {
      throw new ApiError(404, "No blogs found");
    }

    // return the response
    return res
      .status(200)
      .json(new ApiResponse(200, blogs, "Successfully fetched all the blogs"));
  } catch (error) {
    throw new ApiError(
      error.status || 501,
      error.message || "Something went wrong"
    );
  }
};

export default asyncHandler(displayAllBlogs);
