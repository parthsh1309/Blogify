import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const currentUser = async (req, res) => {
  if (!req.user) {
    throw new Error("No user found");
  }
  
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        "Successfully fetched the User Info"
      )
    );
};

export default asyncHandler(currentUser);
