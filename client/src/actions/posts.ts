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
export const getAllPosts = () => async (dispatch: any) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post: any) => async (dispatch: any) => {
  try {
    const { data } = await api.createPost(post);
    console.log(data);
    //dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id: any, post: any) => async (dispatch: any) => {
  try {
    // using { data } destructures the res
    const { data } = await api.updatePost(id, post);
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

/* export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}; */
