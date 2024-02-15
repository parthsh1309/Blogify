import express from "express";
import cors from "cors";

import User from "./models/User";

const app = express();

const corsOption = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

app.get("/api/name", (req, res) => {
  let name = { name: "jethalal" };
  res.send(name);
});

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
