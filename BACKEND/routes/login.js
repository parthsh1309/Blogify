import express from "express";
import createUser from "../controllers/signup.js";
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signup",
  }),
  (req, res) => {}
);

export default router;
