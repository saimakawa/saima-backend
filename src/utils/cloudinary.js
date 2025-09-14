// ✅ 4. cloudinary.js – Cloud storage ke liye config
// Is file ka role:

// Cloudinary service ko configure karta hai.

// API key, secret aur cloud name environment se leta hai.

// ✅ Important:

// Upload logic ko controller mein await ke saath diya gaya tha.

// Yaha sirf config diya hai.

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded succesfully
    // console.log("file is uploaded on cloudinary ", (await response).url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locall saved temporary file as the upload operation got faild
  }
};
export { uploadOnCloudinary };
