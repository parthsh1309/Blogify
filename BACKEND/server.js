import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/database.js";
import User from "./models/User.js";

const app = express();
dotenv.config({ path: "./config/.env" });

app.use(express.json())

const corsOption = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

const sessionConfig = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

import signup from "./routes/auth/signup.js";
import login from "./routes/auth/login.js";
import currentUser from "./routes/auth/currentUser.js";

app.use("/api/v1/", signup);
app.use("/api/v1/",login );
app.use("/api/v1/",currentUser );

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
