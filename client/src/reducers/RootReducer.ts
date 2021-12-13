import { combineReducers } from "redux";
import {
  userAuthReducer,
  apiErrorsReducer,
  userInfoReducer,
  allUsersReducer,
  userCommentInfo,
} from "./users";
import postsReducer from "./posts";
const RootReducer = combineReducers({
  userAuthReducer,
  postsReducer,
  singleUser: userInfoReducer,
  allUsers: allUsersReducer,
  commentUser: userCommentInfo,
  apiErrors: apiErrorsReducer,
});

export default RootReducer;
