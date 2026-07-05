import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try{
        if(!filePath){
            return null
        }
        const uploadResult = await cloudinary.uploader.upload(filePath,{resource_type:'auto'})
        fs.unlinkSync(filePath)
        return uploadResult.secure_url
    }catch(error){
        fs.unlinkSync(filePath)
        console.log(error)
    }
}

export const deleteFromCloudinary = async (fileUrl, resourceType = 'image') => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
        if (!fileUrl) return null;
        
        // Extract public ID from Cloudinary URL
        const parts = fileUrl.split('/');
        const filename = parts[parts.length - 1];
        const publicId = filename.split('.')[0];
        
        return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (error) {
        console.log("Cloudinary delete error:", error);
    }
}

export default uploadOnCloudinary