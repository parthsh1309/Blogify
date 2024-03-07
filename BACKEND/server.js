import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import db from "./config/database.js";
import User from "./models/User.js";

const app = express();
dotenv.config({ path: "./config/.env" });

app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ extended: true, limit: "18kb" }));
app.use(cookieParser());

const corsOption = {
  origin: "https://blogify-sigma.vercel.app",
  optionsSuccessStatus: 200,
  credentials: true,
   methods: 'GET, POST, PUT, DELETE'
};

const corsConnect = (res, req)=>{
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://blogify-sigma.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
}

app.use(cors(corsOption));
app.use(corsConnect);
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

import auth from "./routes/auth/auth.js";
import blog from "./routes/blogs/blog.js";
import dashboard from "./routes/dashboard/dashboard.js";

// auth api
app.use("/auth/api/v1/", auth);

// Blogs api
app.use("/blog/api/v1/", blog);

// dashboard api
app.use("/dashboard/api/v1/", dashboard);


const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
