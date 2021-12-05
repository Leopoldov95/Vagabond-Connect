import Posts from "../models/posts";

// This functions updates all posts from the owner whenever they make changes to their profile
export const updatePostAvatar = async (id: any, imgURL: any) => {
  try {
    await Posts.updateMany(
      { ownerId: id },
      {
        $set: {
          ownerAvatar: imgURL,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
