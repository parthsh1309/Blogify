import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const currentUser = async (req, res) => {
  return req.user
};

export default asyncHandler(currentUser);