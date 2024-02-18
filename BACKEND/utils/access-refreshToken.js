import User from "../models/User.js";
import { ApiError } from "./apiError.js";
const createAccessRefreshToken = async (userId) => {
  try {
    // finding the user
    const user = await User.findById(userId);
    // creating the access and refresh token from the methods created in model
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // setting and saving the refresh token in db
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(501, "Unable to create refresh and access token Please try again later");
  }
};

export { createAccessRefreshToken };
