import asyncHandler from "express-async-handler";
import { ApiError } from "../../utils/apiError.js";
import Blog from "../../models/blog.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const displayAllBlogs = async (req, res) => {
  try {
    // req query parameters 
    let category = req.query?.blogCategory?.split(",")||"All";
    let language = req.query?.language?.split(",");
    const sortBy = req.query.sortBy || "-createdAt";
    const sortObj = {};
    sortObj[sortBy] = -1;

    // fetch Requested blogs from the database
    const blogs = await Blog.find({
      inProduction: req.query.inProduction || false,
      category: { $in: category || "All" },
      language: { $in: language || "English" },
      time: { $lt: req.query.time || 60 },
    })
      .limit(req.query.limit || 10)
      .sort({
        ...sortObj,
      })
      .populate({
        path: "author",
        select: "-password -refreshToken -likedBlogs -savedBlogs -blogPosts",
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
