import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const currentUser = async (req, res) => {
  if (req.user) {
    return res
    .status(200)
    .json(
      new ApiResponse(200, { user: req.user }, "Successfully fetched the User Info")
    );
  }
  return res.status(404).json(new ApiResponse(404, {}, "No User found"));
};

export default asyncHandler(currentUser);
