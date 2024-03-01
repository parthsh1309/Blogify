import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const getUserBlogs = (req, res) => {
  try {
    // get the user details from req
    // get the blogs from the backend
    const blogs = User.find({ uuid: req.params.uuid })
      .select({
        path: "blogs",
        select: "uuid title description coverImage",
      })
      .exec();

    // if blogs are not found
    if (!blogs) {
      throw new ApiError(404, "Blogs not found");
    }
    // else return the blogs
    return res
      .status(200)
      .json(new ApiResponse(200, blogs, "Successfully fetched the blogs"));
  } catch (error) {
    return res.json(new ApiError(501, error.message));
  }
};

export default getUserBlogs;