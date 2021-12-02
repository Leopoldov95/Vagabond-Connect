import mongoose from "mongoose";
import Posts from "../models/posts";
import Users from "../models/users";
import { Request, Response } from "express";
const { uploadCloudinary, deleteCloudinaryImg } = require("./cloudinaryHelper");

// Alot will be happening here

// fetch all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    // retieve all posts we have in the data base
    const allPosts = await Posts.find();
    //console.log(allPosts);
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// fetch only auth user posts

// creta post
export const createPost = async (req: any, res: Response) => {
  // with POST requests, we have access to req.body
  const { title, description, country, selectedFile, commentAccess } = req.body;
  ////////////////////
  // POSSIBLE FUTURE ISSUE //////////
  // So for now I will store user avatar image as part of the posts,
  // IF houwver the post owner changes their porfile picture in the future, MUST apply porofile pic change to all posts, might need a better method in the futrue?
  const { profile_cloudinary, firstName, lastName } = await Users.findById(
    req?.userId
  );
  // create img on cloudinary
  const { secure_url, public_id } = await uploadCloudinary(
    selectedFile,
    "posts"
  );
  const newPost = new Posts({
    title,
    description,
    country,
    commentAccess,
    cloudinary_url: secure_url,
    cloudinary_id: public_id,
    ownerId: req?.userId,
    ownerName: `${firstName} ${lastName}`,
    ownerAvatar: profile_cloudinary,
    createdAt: new Date().toISOString(),
  });
  console.log(newPost);
  try {
    await newPost.save(); //save() is asynchronous\
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// delete post

// add like

// comments
