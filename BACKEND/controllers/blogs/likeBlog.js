import asyncHandler from "express-async-handler";
import { ApiError } from "../../utils/apiError.js";
import Blog from "../../models/blog.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const likeBlog = async (req,res) => {
  try {
    // get the blog based on uuid
    const blog = await Blog.findOne({ uuid: req.params.blogId });

    // if blog don't exist throw error
    if(!blog){
        throw new ApiError(404, "Blog not found");
    }

    // if blog is already liked by user dislike it and return response
    let isLiked = blog.likes.includes(req.user._id);
    if(isLiked){
        await blog.updateOne({ $pull: { likes: req.user._id } });
        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Blog disliked successfully"));
    }

    // else like the blog
    await blog.updateOne({ $push: { likes: req.user._id } });

    // return the response
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Blog liked successfully"));

  } catch (error) {
    throw new ApiError(
      error.status || 501,
      error.message || "Something went wrong"
    );
  }
};

export default asyncHandler(likeBlog)