import asyncHandler from "express-async-handler";
import { ApiError } from "../../utils/apiError.js";
import Comments from "../../models/comments.js";
import Blog from "../../models/blog.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const deleteBlogComment = async (req, res) => {
  try {
    // check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, "User is not authenticated");
    }

    // check if user is authorized to delete the comment
    const comment = await Comments.findOne({uuid: req.params.commentId});
    if (!comment) {
      throw new ApiError(401, "Comment not found");
    }


    // if not throw error
    if (comment.author._id.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "You are not authorized to delete this comment");
    }


    // delete the reference of comment from blog
    await Blog.findByIdAndUpdate(
      { _id: comment.blog },
      { $pull: { comments: comment._id } }
    );

    // delete the comment
    await Comments.findByIdAndDelete(comment._id);

    // return response
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Comment deleted successfully"));


  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || "Something went wrong"
    );
  }
};

export default asyncHandler(deleteBlogComment);
