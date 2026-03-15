import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {
    try {
        console.log("Configuring Cloudinary...");
        console.log("Cloud Name:", process.env.CLOUDINARY_NAME);
        console.log("API Key present:", !!process.env.CLOUDINARY_API_KEY);
        console.log("API Secret present:", !!process.env.CLOUDINARY_SECRET_KEY);

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        })
        console.log("Cloudinary Configured Successfully");
    } catch (error) {
        console.error("Cloudinary Configuration Error:", error);
    }
}

export default connectCloudinary;