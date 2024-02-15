import express from "express";
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
