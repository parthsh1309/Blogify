import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("user", userSchema);

export default User;
