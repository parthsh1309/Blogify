import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/apiError.js";
import { createAccessRefreshToken } from "../../utils/createTokens.js";
import {options} from "../../utils/cookiesOption.js";
const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    // if User Dont exist
    if (!user) {
      return res.status(409).json(new ApiResponse(409, {}, "User Not Found"));
    }

    // Checking If Password correct
    const isPassValid = await user.isPasswordCorrect(password);

    // if Password is Invalid
    if (!isPassValid) {
      return res
        .status(401)
        .json(new ApiResponse(409, {}, "Incorrect Password"));
    }

    //If Password is valid
    //Get the Access and Refresh Token
    const { accessToken, refreshToken } = await createAccessRefreshToken(
      user._id
    );

    // getting the user details again because of changes in database
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // returning user details,access and refresh token as response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options.accessToken)
      .cookie("refreshToken", refreshToken, options.refreshToken)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "Successfully Logged In The User"
        )
      );
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};

export default asyncHandler(loginUser);
