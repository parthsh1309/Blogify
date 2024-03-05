import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const userLikedBlogs = (req, res) => {
  try {
    // get the user details from req
    // get the liked blogs from the database
    const likedBlogs = User.findById(req.user._id)
      .select({
        path: "likedBlogs",
      }).populate({
        path: "likedBlogs",
        select: "uuid title description coverImage",
      })
      .exec();
    // if liked blogs are not found
    if (!likedBlogs) {
      throw new ApiError(404, "Liked blogs not found");
    }

    // return the liked blogs
    return res
      .status(200)
      .json(
        new ApiResponse(200, likedBlogs, "Successfully fetched the liked blogs")
      );
  } catch (error) {
    console.log(error);
    return res.json(new ApiError(501, error));
  }
};

export default userLikedBlogs;