import mongoose from "mongoose";

const { Schema } = mongoose;

const likeSchema = new Schema(
  {
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog",
        required:true
    }
  },
  {
    timestamps: true,
  }
);


const Likes = mongoose.model("like", likeSchema);

export default Likes;
