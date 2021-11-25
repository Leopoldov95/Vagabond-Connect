import Users from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
const { cloudinary } = require("../utils/cloudinary.js");
/* export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist..." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test123",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, avatar } =
    req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords don't match!" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({
      firstName,
      lastName,
      email,
      avatar: avatar ? avatar : "",
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
 */

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
      cloudinaryImg = await cloudinary.uploader.upload(selectedFile, {
        upload_preset: "socialmediaimgapi",
      });
    }
    /*  const result = await Users.create({
      firstName,
      lastName,
      email,
      avatar: avatar ? avatar : "",
      password: hashedPassword,
    }); */
    await Users.create({
      firstName,
      lastName,
      country,
      email,
      profilePic: cloudinaryImg ? cloudinaryImg?.secure_url : "",
      cloudinary_profile_id: cloudinaryImg ? cloudinaryImg?.public_id : "",
      password: hashedPassword,
    });
    /* const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    }); */
    //res.status(200).json({ result: result, token });
    res.status(200).json({ message: "User Created!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
