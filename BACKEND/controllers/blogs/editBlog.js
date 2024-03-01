import Blog from "../../models/blog.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const editBlog = async (req, res) => {
  try {
    // check if user is authenticated
    if (!req.user) {
      throw new ApiError(401, "User is not authenticated");
    }

    // check if the blog exists
    const blog = await Blog.findOne({ uuid: req.params.blogId });
    if(!blog){
      throw new ApiError(404, "Blog not found");
    }

    // check if the user is authorized to edit the blog
    if (blog.author._id.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "The user is not authorized");
    }

    // getting items from body
    const { title, text, inProduction,language,time } = req.body;

    // update the blog
   
   await Blog.updateMany({ _id: blog._id },{
    title,
    text,
    inProduction,
    language,
    time
   });

   const updatedBlog = await Blog.findById(blog._id);
    // return the response
    return res
    .status(200)
    .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
} catch (error) {
    console.log(error);
    throw new ApiError(
      error.status || 500,
      error.message || "Internal Server Error"
    );
  }
};

export default editBlog;
