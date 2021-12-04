import mongoose from "mongoose";

import Users from "../models/users";
import Posts from "../models/posts";

export const updatePostAvatar = async (id: any, imgURL: any) => {
  try {
    const allPosts: any = Posts.find();
    const userPosts = allPosts.toObject().filter((post) => post.ownerId === id);
  } catch (error) {}
};
