import Users from "../models/users";
import Posts from "../models/posts";
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
    console.log(existingUser);
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
      "vagabondtoken",
      { expiresIn: "3h" }
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
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "vagabondtoken",
      {
        expiresIn: "3h",
      }
    );
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
    /*  const { id, action, skip } = req.params; */
    const { params } = req.params; // this will be the name of the modified URL
    const urlParams = new URLSearchParams(params);
    const filters = Object.fromEntries(urlParams);
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

    let user;
    let fetchedUsers;
    // no user is logged in, send all users
    // may want to post a number to represent what to skip (example number of users.length from client)
    if (filters.userId) {
      if (!mongoose.Types.ObjectId.isValid(filters.userId))
        return res.status(404).send("Not A Valid User Id!");
      user = await Users.findById(filters.userId);
    }
    if (!filters.userId) {
      fetchedUsers = await Users.find(
        {},
        {
          ...ignore,
        }
      ).limit(30);
    } else {
      // we have an authenticad user
      fetchedUsers = await Users.find(
        {
          _id:
            filters.selected !== "find"
              ? { $in: user[filters.selected] }
              : { $nin: user["following"] },
        },
        {
          ...ignore,
        }
      ).limit(30);
    }
    res.status(200).json(fetchedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const fetchSingleUser = async (req: Request, res: Response) => {
  const ignore = {
    email: 0,
    password: 0,
    profile_cloudinary_id: 0,
    background_cloudinary_id: 0,
    messages: 0,
    notifications: 0,
  };
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "No Valid User" });
    const result = await Users.find(
      { _id: id },
      {
        ...ignore,
      }
    );

    res.status(200).json(result);
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
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const fetchUserCommentInfo = async (req: Request, res: Response) => {
  try {
    const { id: _id } = req.params;
    // chacking of id is valid
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that ID");
    const { profile_cloudinary, firstName, lastName } = await Users.findById(
      _id
    );
    // keep in mind that not all users will have a profile picture

    res.json({ profile_cloudinary, firstName, lastName });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const editUserCountryList = async (req: any, res: Response) => {
  try {
    const _id = req.userId;
    const { name } = req.params;
    const newList = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that ID");
    const user = await Users.findById(_id);
    if (!user) return res.status(404).send("No user with that ID");
    let propsToChange = {};
    propsToChange[`${name}Countries`] = newList;
    const result = await Users.findByIdAndUpdate(
      _id,
      { $set: { ...propsToChange } },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// DELETE USER

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id: _id } = req.params;
    const { password } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("Not A Valid User Id!");
    const existingUser: any = await Users.findById(_id);
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist." });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });
    // At this point the userId and password have been authenticated
    // handle users following and followers
    if (existingUser?.following?.length > 0 && existingUser?.following) {
      // update folloeing list
      for (let user of existingUser.following) {
        console.log(`you are following ${user}`);
        await Users.findByIdAndUpdate(user, {
          $pull: { followers: _id },
        });
      }
    }
    if (existingUser?.followers?.length > 0 && existingUser?.followers) {
      // update followers list
      for (let user of existingUser.followers) {
        console.log(`${user} is your follower`);
        await Users.findByIdAndUpdate(user, {
          $pull: { following: _id },
        });
      }
    }
    const usersPosts: any = await Posts.find({ ownerId: _id });

    if (usersPosts.length > 0) {
      for (let post of usersPosts) {
        await deleteCloudinaryImg(post.cloudinary_id);
      }
    }
    // delete all users posts
    await Posts.deleteMany({
      ownerId: _id,
    });
    // remove user from db
    await Users.findByIdAndDelete(_id);
    res.json({ message: "Account Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
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
  try {
    const { query } = req.params;
    console.log(query);
    const result = await Users.find(
      {
        firstName: { $regex: query, $options: "i" },
      },
      { ...ignore }
    );
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
