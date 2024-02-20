import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../../utils/apiError.js";
import Blog from "../../models/blog.js";
import Comments from "../../models/comments.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const blogComment = async (req, res) => {
  try {
    // check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, "User is not authenticated");
    }

    // Get the data from body
    // TODO: Add validation
    const { content } = req.body;

    // get the Blog post from uuid
    const blog = await Blog.findOne({ uuid: req.params.blogId });

    // if there's no blog
    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    // save the data to database
    const comment = await Comments.create({
      uuid:uuidv4(),
      content,
      author: req.user._id,
      blog: blog._id,
    });
    // save the comment reference to blog
    await Blog.findOneAndUpdate(
      { uuid: req.params.blogId },
      {
        $push: { comments: comment._id },
      }
    );

    // return the response
    return res
      .status(200)
      .json(new ApiResponse(200, comment, "Comment created successfully"));
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || "Something went wrong"
    );
  }
};

export default asyncHandler(blogComment);
