import { combineReducers } from "redux";
import {
  userAuthReducer,
  apiErrorsReducer,
  userInfoReducer,
  allUsersReducer,
  userCommentInfo,
} from "./users";
import { snackbarMessage } from "./snackbar";
import { isMorePostsReducer, isMoreUsersReducer } from "./isMore";
import postsReducer from "./posts";
import { messageReducer, contactsReducer, targetIdReducer } from "./message";
const RootReducer = combineReducers({
  userAuthReducer,
  messageReducer,
  targetIdReducer,
  contactsReducer,
  postsReducer,
  isMorePostsReducer,
  isMoreUsersReducer,
  snackbar: snackbarMessage,
  singleUser: userInfoReducer,
  allUsers: allUsersReducer,
  commentUser: userCommentInfo,
  apiErrors: apiErrorsReducer,
});

export default RootReducer;
