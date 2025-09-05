import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import e from "express";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are require");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) throw new ApiError(409, "User with email all ready exists");
  // console.log(existedUser);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(req.files);

  // console.log(avatarLocalPath);
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (
    registerUser.files &&
    Array.isArray(req.files.coverImage) &&
    registerUser.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0];
  }
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is require");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is require");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registring the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
// form, json se data ayega to req.body me milega

export { registerUser };
