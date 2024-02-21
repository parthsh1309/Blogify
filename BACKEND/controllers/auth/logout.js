import asyncHandler from "express-async-handler";
import { ApiError } from "../../utils/apiError.js";
import User from "../../models/User.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import {options} from "../../utils/cookiesOption.js"

const logout = async (req, res) => {
  try {
    // updating the refresh token to empty and save it in DB
    const userData = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    userData.refreshToken = null;
    userData.save();

    // clearing the cookie and sending the response
    return res
      .status(200)
      .clearCookie("accessToken",options.accessToken)
      .clearCookie("refreshToken",options.refreshToken)
      .json(new ApiResponse(200, {}, "Successfully Logged Out The User"))
      
  } catch (error) {
    return res.json(new ApiError(501, error.message));
  }
};

export default asyncHandler(logout);
