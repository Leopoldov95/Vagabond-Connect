// Posts reducers
import {
  FETCH_ALL_POSTS,
  FETCH_USER_POSTS,
  CREATE_POST,
  EDIT_POST,
  EDIT_POST_AVATAR,
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
    case FETCH_USER_POSTS:
      console.log("Reducer file: You want to get only User posts");
      return action.payload;
    case CREATE_POST:
      return [...posts, action.payload];
    default:
      return posts;
      break;
  }
};

export default postsReducer;
