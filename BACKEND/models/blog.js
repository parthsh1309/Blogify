import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    coverImage: {
      publicId:{
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true,
      }
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    inProduction: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      enum: ["Technology", "Lifestyle", "Business", "Travel", "Food"],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogSchema);

export default Blog;
