import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import {ApiResponse} from "../../utils/apiResponse.js";
import {ApiError} from "../../utils/apiError.js";
import { createAccessRefreshToken } from "../../utils/createTokens.js";
import { options } from "../../utils/cookiesOption.js";

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    // get details from body
    const { username, email, password } = req.body;
    if(!username || !email || !password){
      throw new ApiError(400,"All fields are mandatory");
    }
    // check if the users exist in database
    const existingUser = await User.findOne({ email: email });
  
    // if user exists
    if (existingUser) {
      return res
        .status(200)
        .json(new ApiResponse(409, {}, "User Already Exists Please Login using the credentials...."));
    }
  
    // if user dont exists
    // save the details in the database
    const user = await User.create({
      username,
      email,
      password,
    });

    const { accessToken, refreshToken } = await createAccessRefreshToken(
      user._id
    );


    // get the user from the database
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    
    // return the response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options.accessToken)
      .cookie("refreshToken", refreshToken, options.refreshToken)
      .json(
        new ApiResponse(
          200,
          {
            user: createdUser,
            accessToken,
            refreshToken,
          },
          "Successfully Created The User"
        )
      );

  } catch (error) {
    return new ApiError(500,"Unable to registered the user",error)
  }
};

export default asyncHandler(createUser);
