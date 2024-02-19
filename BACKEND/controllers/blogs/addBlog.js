import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../../utils/apiError.js";
import { uploadCloudinaryFile } from "../../utils/cloudinary.js";
import Blog from "../../models/blog.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import User from "../../models/User.js";

const createBlog = async (req, res) => {
  try {
    // checking if user is authenticated
    if (!req.user) {
      throw new ApiError(401, "User is not authenticated");
    }
    // get data from body
    const { title, text, inProduction } = req.body;

    // TODO: Add cover image here from req.files
    const coverImgUrl =
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg";

    // if there's no cover image
    if (!coverImgUrl) {
      throw new ApiError(400, "Cover Image is required");
    }

    // Upload image to cloudinary
    const coverImg = await uploadCloudinaryFile(coverImgUrl);

    // if image is not uploaded
    if (!coverImg) {
      throw new ApiError(501, "Unable to upload image");
    }

    // save the data to database
    const blog = await Blog.create({
      author: req.user._id,
      title,
      text,
      inProduction,
      coverImage: { url: coverImg.url, publicId: coverImg.public_id },
      uuid: uuidv4(),
    });

    // saving the blog reference to user

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { blogPosts: blog._id } }
    );

    // return the response
    return res
      .status(200)
      .json(new ApiResponse(200, blog, "Blog created successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Something went wrong"
    );
  }
};

export default asyncHandler(createBlog);
