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

// update posts

export const updatePost = async (req: any, res: Response) => {
  // will want to send cloudinary_id here!
  // when destructuring, we can rename our properties such as { id:_id }
  const { id: _id } = req.params;
  const {
    title,
    description,
    selectedFile,
    country,
    commentAccess,
    cloudinary_id,
  } = req.body;
  let existingPostId;
  let newImg;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID");
  /* console.log(_id);
  console.log(post); */
  // the selectedFile is not an url, therefore we need exisitng cloudinary_id
  // const exisitngCloudinaryId = post.selectedFile.includes("cloudinary") ? null : await Posts.findById(_id)
  if (!selectedFile.includes("cloudinary")) {
    const { cloudinary_id } = await Posts.findById(_id);
    existingPostId = cloudinary_id;
    const { secure_url, public_id } = await uploadCloudinary(
      selectedFile,
      "posts"
    );
    newImg = { secure_url, public_id };
  }

  // check if post selectedFile is an url or base64 string, if it is a base64 string, first grab the existing cloud_id, create a new cloud_img, update post, then delete prev coloud_id + cloud_img

  // update post if id is valid
  //{...post, _id}
  const updatedPost = await Posts.findByIdAndUpdate(
    _id,
    {
      title,
      description,
      country,
      commentAccess,
      cloudinary_url: newImg ? newImg.secure_url : selectedFile,
      cloudinary_id: newImg ? newImg.public_id : cloudinary_id,
      _id,
    },
    { new: true }
  );
  // we have the id of the previous image
  if (existingPostId) {
    await deleteCloudinaryImg(existingPostId);
  }

  res.json(updatedPost);
};

// we will update the posts owner avatar AFTER the user updates their own profile picture
export const updatePostAvatar = async (req: Request, res: Response) => {
  try {
    // the problem with drawing from the client post state is that as soon as the page is refreshed, it will reset the posts state
    const posts = req.body;
    console.log(req.body);
    //const postOwner = Users.findById(req.body[0].ownerId);
    //console.log(postOwner);
    // from the client, we will need the posts stored in the state as well as the user info
    // we will need to filter out the posts to only get posts that belong to the user
    // MAKE CHANGES TO THE POSTS THAT ARE RETRIEVED FROM THE CLIENT, that way it is earier to transfer the changes to the db
    // Then use updateMany to apply changes to all documents that require it
    // return result to client
  } catch (error) {
    console.log(error);
  }
};
// delete post

// add like

// comments
