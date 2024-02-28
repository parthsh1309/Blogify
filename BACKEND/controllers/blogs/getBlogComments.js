import asyncHandler from "express-async-handler";
import Blog from "../../models/blog.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const getblogComments = async (req, res) => {
  try {
    // get the blog based on uuid
    const blogComments = await Blog.findOne({ uuid: req.params.blogId })
      .select("uuid comments")
      .populate({
        path: "comments",
       populate: { path: "author", select: "username" },
      })
      .limit(15)
      .exec();

    // if blog don't exist throw error
    if (!blogComments) {
      throw new ApiError(404, "Blog not found");
    }

    // return the response
    return res
    .status(200)
    .json(new ApiResponse(200, blogComments, "Comments fetched successfully"));
  } catch (error) {
    throw new ApiError(
      error.status || 501,
      error.message || "Something went wrong"
    );
  }
};

export default asyncHandler(getblogComments);
