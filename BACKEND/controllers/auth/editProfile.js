import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js            "
import { ApiResponse } from "../../utils/apiResponse.js";

const editProfile = async (req, res) =>{
    try {
        // check if user is authenticated
        if(!req.user){
            throw new ApiError(401, "User is not authenticated")
        }
        // get data from body
        const {username, email} = req.body;

        // check if user exists
        const existingUser = await User.findById(req.user._id);
        if(!existingUser){
            throw new ApiError(404, "User not found")
        }

        // check if user is authorized
        if(req.user.uuid !== existingUser.uuid){
            throw new ApiError(401, "You are not authorized")
        }

        // update the user
        const user = await User.findByIdAndUpdate(req.user._id, {username, email}).select("_id uuid username email");

        if(!user){
            throw new ApiError(404, "User not found")
        }
        return res.json(new ApiResponse(200, user, "Successfully updated the user"))
    } catch (error) {
        console.log(error);
        return res.json(new ApiError(501, error.message));
    }
}

export default editProfile