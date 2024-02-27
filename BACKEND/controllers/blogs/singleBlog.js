import asyncHandler from "express-async-handler";
import { ApiError } from "../../utils/apiError.js";
import Blog from "../../models/blog.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const displaySingleBlog = async (req, res) => {
  try {
    // fetch the blog from database based on uuid
    const blog = await Blog.findOne({
      uuid: req.params.blogId,
    }).populate({
      path: "author",
      select: "username email",
    })

    // if there's no blog
    if (!blog) {
      res.status(404).json(new ApiResponse(404, {}, "Blog not found"));
    }

    // return the response
    return res
      .status(200)
      .json(new ApiResponse(200, blog, "Successfully fetched the Blog"));
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || "Something went wrong"
    );
  }
};

export default asyncHandler(displaySingleBlog);
