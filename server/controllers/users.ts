import Users from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Request, Response } from "express";
const { uploadCloudinary, deleteCloudinaryImg } = require("./cloudinaryHelper");

export const signin = async (req, res) => {
  // need two things from the fronted - email and password
  const { email, password } = req.body;
  //console.log(req.body);
  try {
    // check to see if user exists
    const existingUser = await Users.findOne({ email }); // look for an existing user by using the email

    if (!existingUser)
      return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });
    // if user does exist by passing the above checks, then the user can proceed to logging in
    // send a json web token to the frontend
    // the 'test' string here is the secret key for the token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    selectedFile,
    country,
  } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords don't match!" });
    let cloudinaryImg;
    const hashedPassword = await bcrypt.hash(password, 12);
    if (selectedFile) {
      cloudinaryImg = await uploadCloudinary(selectedFile);
    }
    console.log(cloudinaryImg);
    const result = await Users.create({
      firstName,
      lastName,
      country,
      email,
      profile_cloudinary: cloudinaryImg ? cloudinaryImg?.secure_url : "",
      profile_cloudinary_id: cloudinaryImg ? cloudinaryImg?.public_id : "",
      password: hashedPassword,
    });

    // generate a jwt toke so that the user will be logged in immediatley after registering
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: result, token });
    //res.status(200).json({ message: "User Created!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const editProfileImg = async (req: any, res: Response) => {
  /*   console.log(req.params);
  console.log(req.body); */
  // Make sure to send all user data here from client local storage!!
  // utilize profile string
  // from local sotrage user, get cloudImg and cloud_id,
  // use cloud_id to delete from cloudinary
  // upload new image to cloudinary
  // then use findbyidandupdate
  const { id: _id } = req.params;
  const { profile, uploadedImg, user } = req.body;
  //let testProfile = "profile_cloudinary";
  /* console.log(profile);
  console.log(user); */
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "No Valid User" });

  //const user = await Users.findById(_id);
  // check if user has a current background profile pic, if they do, must delete img from cloudinary, or perhaps store it here and delete later
  // store existing id to variable in order to delete later, we only want to delete AFTER sucessfully updating existing image
  const existingCloudinaryId = user[profile] ? user[`${profile}_id`] : null;
  const cloudinaryImg = await uploadCloudinary(uploadedImg);

  console.log(cloudinaryImg);

  let propsToChange = {};
  propsToChange[profile] = cloudinaryImg?.secure_url;
  propsToChange[`${profile}_id`] = cloudinaryImg?.public_id;
  console.log(propsToChange);
  const result = await Users.findByIdAndUpdate(
    _id,
    { $set: { ...propsToChange } },
    { new: true }
  );

  // now that we made changes, delete previous image from db
  await deleteCloudinaryImg(existingCloudinaryId);

  // not necessary to return anything
  // however if we want to update user info to the front end, we may want to change/update the localstate
  res.json(result);
};
