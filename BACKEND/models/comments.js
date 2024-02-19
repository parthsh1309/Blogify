import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content:{
        type:String,
        required:true
    },
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


const Comments = mongoose.model("comment", commentSchema);

export default Comments;
