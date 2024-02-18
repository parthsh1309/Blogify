import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const createUser = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  let user = new User({
    username,
    email,
  });
  const registeredUser = await User.register(user, password);
  res.send(registeredUser);
};

export default asyncHandler(createUser);
