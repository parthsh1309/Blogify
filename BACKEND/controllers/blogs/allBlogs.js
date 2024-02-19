import asyncHandler from "express-async-handler";
import { ApiError } from "../../utils/apiError.js";
import Blog from "../../models/blog.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const displayAllBlogs = async (req, res) => {
  try {
    // fetch all the blogs from database
    const blogs = await Blog.find({
      inProduction: req.query.inProduction || false,
    }).limit(req.query.limit||10).sort({ createdAt: -1 });

    // if there are no blogs
    if (!blogs || blogs.length === 0) {
      throw new ApiError(404, "No blogs found");
    }

    // return the response
    return res
      .status(200)
      .json(new ApiResponse(200, blogs, "Successfully fetched all the blogs"));
  } catch (error) {
    throw new ApiError(501, error.message || "Something went wrong");
  }
};

export default asyncHandler(displayAllBlogs);
