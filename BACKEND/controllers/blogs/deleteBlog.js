import asyncHandler from "express-async-handler";
import {v2 as cloudinary} from "cloudinary"
import { ApiError } from "../../utils/apiError.js";
import Blog from "../../models/blog.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const deleteBlog = async (req, res) => {
  try {
    // check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, "User is not authenticated");
    }

    // if the blog is not found throw error
    const blog = await Blog.findOne({ uuid: req.params.blogId });
    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    // if the author of the blog is not the same as the user throw error
    if (blog.author._id.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "The user is not authorized");
    }

    // delete the image
    let response = await cloudinary.uploader.destroy(blog.coverImage.publicId);

    if(!response){
      throw new ApiError(501, "Unable to delete image");
    }

    // delete the blog
    await Blog.deleteOne({ uuid: req.params.blogId });

    // return the response
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Blog deleted successfully"));
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || "Something went wrong"
    );
  }
};

export default asyncHandler(deleteBlog);
