import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  let user = new User({
    username,
    email,
  });
  const registeredUser = await User.register(user, password);
  return true;
};

export default asyncHandler(createUser);
