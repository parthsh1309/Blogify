import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import User from "../models/User.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    // if theres no token
    if (!token) {
      return res.status(401).json({ error: "Access token not found" });
    }
    // decode the token to get id of user
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // if theres a token get a user from it
    const user = await User.findById(decodedToken._id).select(
      "_id uuid username email"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    // if there's user set the req.user to user data
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid access token");
  }
});

export {verifyJWT}