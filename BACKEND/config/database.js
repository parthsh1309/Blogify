import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const databaseUrl = process.env.DATABASE_URL;
// console.log(databaseUrl);

const connection = mongoose
  .connect(databaseUrl, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(console.log("connection open"))
  .catch((err) => {
    console.log(err);
  });


  export default connection
