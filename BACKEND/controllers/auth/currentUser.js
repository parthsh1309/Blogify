import asyncHandler from "express-async-handler";
import User from "../../models/User.js";

const currentUser = async (req, res) => {
  if(req.user){
   res.send(req.user)
  }
  res.send({})
};

export default asyncHandler(currentUser);