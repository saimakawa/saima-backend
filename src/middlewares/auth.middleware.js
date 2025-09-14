// ✅ 3. auth.middleware.js – Authentication check
// Is file ka role:

// Har request mein check karta hai ki user logged in hai ya nahi.

// ✅ Key logic:

// Token cookies ya header se le raha hai.

// replace("Bearer ", "") ka use karke token ko clean kar raha hai.

// JWT se verify kar raha hai.

// ✅ Important fix:

// req.header("Authorization")?.replace("Bearer ", "") diya hai taki agar header na ho toh error na aaye.

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthrized token");
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) throw new ApiError(401, "Invalid access token");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.messase || "Invalid access token");
  }
});
