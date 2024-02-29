import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./apiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadCloudinaryFile = async (fileURL) => {
  try {
    // check if fileURL is provided
    if (!fileURL) {
      throw new ApiError(400, "File URL is required");
    }

    // Upload image to cloudinary
    const fileResponse = await cloudinary.uploader.upload(fileURL, {
      resource_type: "auto",
      folder: "Blogify",
      use_filename: true,
      unique_filename: true,
    });

    // if image is not uploaded
    if (!fileResponse) {
      throw new ApiError(501, "Unable to upload image");
    }
    
    // delete the image from local storage
    // fs.unlinkSync(fileURL);
    
    // return the response
    return fileResponse;
  } catch (error) {
    // fs.unlinkSync(fileURL);
    throw new ApiError(501, error.message);
  }
};

export { uploadCloudinaryFile };
