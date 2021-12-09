import Users from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Request, Response } from "express";
const { uploadCloudinary, deleteCloudinaryImg } = require("./cloudinaryHelper");
const { updatePostAvatar } = require("./helper");

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
      cloudinaryImg = await uploadCloudinary(selectedFile, "profile");
    }
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
  try {
    const { id: _id } = req.params;
    const { profile, uploadedImg, user } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).json({ message: "No Valid User" });
    // check if user has a current background profile pic, if they do, must delete img from cloudinary, or perhaps store it here and delete later
    // store existing id to variable in order to delete later, we only want to delete AFTER sucessfully updating existing image
    const existingCloudinaryId = user[profile] ? user[`${profile}_id`] : null;
    const cloudinaryImg = await uploadCloudinary(
      uploadedImg,
      profile.split("_")[0]
    );

    // create a temporary object to store new/existing properties in using thr profile
    let propsToChange = {};
    propsToChange[profile] = cloudinaryImg?.secure_url;
    propsToChange[`${profile}_id`] = cloudinaryImg?.public_id;
    const result = await Users.findByIdAndUpdate(
      _id,
      { $set: { ...propsToChange } },
      { new: true }
    );

    if (profile === "profile_cloudinary") {
      await updatePostAvatar(req?.userId, cloudinaryImg?.secure_url);
    }

    // now that we made changes, delete previous image from db
    await deleteCloudinaryImg(existingCloudinaryId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const editUserDetails = async (req: any, res: Response) => {
  const data = req.body;
  const { email } = data;
  const _id = req?.userId;
  try {
    const existingUser = await Users.findOne({ email }); // look for an existing user by using the email

    if (!existingUser)
      return res.status(404).json({ message: "User does not exist." });
    const result = await Users.findByIdAndUpdate(
      _id,
      { $set: { ...data } },
      { new: true }
    );

    // need to update the state and store new info to client
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// note that it doesnt matter if we are fetcing followers or follwoing, they will share duplicate users. when fetching all/extra users, only filter out people who I am following
//mondodb has a .sot() method
export const fetchAllUsers = async (req: any, res: Response) => {
  try {
    const { id, action, skip } = req.params;
    const ignore = {
      country: 0,
      email: 0,
      password: 0,
      privacy: 0,
      profile_cloudinary_id: 0,
      followers: 0,
      following: 0,
      messages: 0,
      notifications: 0,
      favoriteCountries: 0,
      visitedCountries: 0,
    };
    let fetchedUsers;

    // no user is logged in, send all users
    // may want to post a number to represent what to skip (example number of users.length from client)
    if (id.length === 1) {
      fetchedUsers = await Users.find(
        {},
        {
          ...ignore,
        }
      ).limit(30);
    } else {
      // there is a user logged in, so we will need to filter
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No User with that ID");
      const user = await Users.findById(id);
      // might want error handling if no user exists with that id. be mindful of the error handling here...

      // we want to retrieve from list of following OR followers
      if (user[action]) {
        fetchedUsers = await Users.find(
          { _id: { $in: user[action] } },
          {
            ...ignore,
          }
        ).limit(30);
      } else {
        // we will send all users that you are not following
        fetchedUsers = await Users.find(
          { _id: { $nin: user["following"] } },
          {
            ...ignore,
          }
        ).limit(30);
      }
    }

    res.status(200).json(fetchedUsers);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const fetchSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "No Valid User" });
    const result = await Users.findById(id);
    const {
      _id,
      firstName,
      lastName,
      country,
      profile_cloudinary,
      background_cloudinary,
      followers,
      following,
      favoriteCountries,
      visitedCountries,
      privacy,
    } = result;
    res.status(200).json({
      _id,
      firstName,
      lastName,
      country,
      profile_cloudinary,
      background_cloudinary,
      followers,
      following,
      favoriteCountries,
      visitedCountries,
      privacy,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// not that in the future, may want to handle privacy request
// can use this to follow and unfollow, may want same logic to like and unlike
export const followUser = async (req: any, res: Response) => {
  try {
    const { id: _id } = req.params;
    console.log(_id);
    console.log(req?.userId);
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    // chacking of id is valid
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that ID");
    const targetUser = await Users.findById(_id);
    const currentUser = await Users.findById(req?.userId);
    // checkicking if already following
    const index = targetUser.followers.findIndex(
      (id) => id === String(req.userId)
    );
    if (index === -1) {
      // follow a user
      targetUser.followers.push(req.userId);
      currentUser.following.push(_id);
    } else {
      // unfollow a user
      targetUser.followers = targetUser.followers.filter(
        (id) => id !== String(req.userId)
      );
      currentUser.following = currentUser.following.filter(
        (id) => id !== String(_id)
      );
    }
    // update targetted User db
    await Users.findByIdAndUpdate(_id, targetUser, { new: true });

    // update current User db
    const updatedUser = await Users.findByIdAndUpdate(
      req?.userId,
      currentUser,
      { new: true }
    );

    res.json(updatedUser);
    /*  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
  
    res.json(updatedPost);
    await Users.findByIdAndUpdate( _id,
      { $set: { followers } },
      { new: true })

    // we will update the users following array and return the result
    const result */
  } catch (error) {}
};

/* 
export const likePost = async (req, res) => {
  const { id } = req.params;
  // we get access to req.userId from the middleware we are passing (auth)
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  // chacking of id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");

  const post = await PostMessage.findById(id);
  // handling like logic for user
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

*/
