// posts actions
import {
  EDIT_POST,
  CREATE_POST,
  DELETE_POST,
  FETCH_ALL_POSTS,
  FETCH_USER_POSTS,
} from "../constants/actionTypes";
import * as api from "../api";

// Action creators
// redux thunk, redux async
// instead of using return, have to use dispatch
export const getAllPosts =
  (id: any = 0) =>
  async (dispatch: any) => {
    try {
      const { data }: any = await api.fetchPosts(id);
      dispatch({ type: FETCH_ALL_POSTS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

// may want to handle filter on the server
// 12-10-21, this issue here is that I need to handle the find and filter issue on the balcend
export const getUserPosts = (id: any) => async (dispatch: any) => {
  try {
    const { data }: any = await api.fetchUserPosts(id);
    const userPosts = data.filter((post: any) => post?.ownerId === id);
    userPosts.length !== 0
      ? dispatch({ type: FETCH_USER_POSTS, payload: userPosts })
      : dispatch({ type: FETCH_USER_POSTS, payload: "empty" });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post: any) => async (dispatch: any) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id: any, postData: any) => async (dispatch: any) => {
  try {
    // using { data } destructures the res
    const { data } = await api.updatePost(id, postData);

    dispatch({ type: EDIT_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id: any) => async (dispatch: any) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id: any) => async (dispatch: any) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: EDIT_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Comment Actions

// create a comment
export const createComment =
  (postId: any, formData: any) => async (dispatch: any) => {
    try {
      const { data } = await api.createComment(postId, { formData });
      dispatch({ type: EDIT_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

// edit a comment
export const editComment =
  (comment: String, postId: any, commentId: any) => async (dispatch: any) => {
    try {
      const { data } = await api.editComment({ comment }, postId, commentId);
      dispatch({ type: EDIT_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
// delete a comment

export const deleteComment =
  (postId: any, commentId: any) => async (dispatch: any) => {
    try {
      const { data } = await api.deleteComment(postId, commentId);
      dispatch({ type: EDIT_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
