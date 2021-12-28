// Posts reducers
import {
  FETCH_ALL_POSTS,
  FETCH_MORE_POSTS,
  FETCH_USER_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
} from "../constants/actionTypes";

const postsReducer = (posts: any = [], action: any) => {
  switch (action.type) {
    case DELETE_POST:
      // keep awar, _id OR id?
      return posts.filter((post: any) => post._id !== action.payload);
    case EDIT_POST:
      //case "LIKE": //can use mutliple cases for same logic
      // random info - result of any map is an array
      return posts.map((post: any) =>
        post._id === action.payload._id ? action.payload : post
      );

    case FETCH_ALL_POSTS:
      return action.payload;
    case FETCH_MORE_POSTS:
      console.log("made it to reducer ");
      return [...posts, ...action.payload];
    case FETCH_USER_POSTS:
      return action.payload;
    case CREATE_POST:
      return [action.payload, ...posts];
    default:
      return posts;
      break;
  }
};

export default postsReducer;
