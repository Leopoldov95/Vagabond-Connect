import { combineReducers } from "redux";
import {
  userAuthReducer,
  apiErrorsReducer,
  userInfoReducer,
  allUsersReducer,
  userCommentInfo,
  socketReducer,
} from "./users";
import { connectionReducer } from "./connection";
import { snackbarMessage } from "./snackbar";
import { isMorePostsReducer, isMoreUsersReducer } from "./isMore";
import postsReducer from "./posts";
import {
  messageReducer,
  contactsReducer,
  msgNotificationReducer,
} from "./message";
const RootReducer = combineReducers({
  userAuthReducer,
  messageReducer,
  contactsReducer,
  postsReducer,
  socketReducer,
  connectionReducer,
  isMorePostsReducer,
  isMoreUsersReducer,
  msgNotificationReducer,
  snackbar: snackbarMessage,
  singleUser: userInfoReducer,
  allUsers: allUsersReducer,
  commentUser: userCommentInfo,
  apiErrors: apiErrorsReducer,
});

export default RootReducer;
