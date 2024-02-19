import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { ApiError } from "../../utils/apiError.js";
import User from "../../models/User.js";
import {createAccessRefreshToken} from "../../utils/createTokens.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const refreshAccess = async (req, res) => {
  // getting refresh token from cookies
  const incomingRefreshToken = req.cookies.refreshToken;

  // if token doesnt exist
  if (!incomingRefreshToken) throw new ApiError(401, "Refresh Token don't Exist");

  try {
    // decoding refresh token to get userID
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // checking if refresh token valid
    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // checking if cookie refresh tokens matches with db refresh token
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(
        401,
        "Provided Refresh Token is expired or Already used"
      );
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    // creating new tokens
    const { accessToken, refreshToken } = await createAccessRefreshToken(user._id);


    // sending access and refresh token through cookies
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid Refresh Token");
  }
};

export default expressAsyncHandler(refreshAccess);
