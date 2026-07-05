import uploadOnCloudinary from "../configs/cloudinary.js";
import User from "../models/userModel.js";

export const getCurrentUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses")
         if(!user){
            return res.status(400).json({message:"user does not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"get current user error"})
    }
}

import { deleteFromCloudinary } from "../configs/cloudinary.js";

export const UpdateProfile = async (req,res) => {
    try {
        const userId = req.userId
        const {name , description} = req.body
        let photoUrl
        
        let oldUser = await User.findById(userId);
        if(!oldUser){
            return res.status(404).json({message:"User not found"})
        }

        if(req.file){
           if(oldUser.photoUrl) {
               await deleteFromCloudinary(oldUser.photoUrl);
           }
           photoUrl = await uploadOnCloudinary(req.file.path)
        }
        
        const updateData = {name, description};
        if (photoUrl) {
            updateData.photoUrl = photoUrl;
        }

        const user = await User.findByIdAndUpdate(userId, updateData, {new: true}).select("-password");

        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Update Profile Error"})
    }
}
