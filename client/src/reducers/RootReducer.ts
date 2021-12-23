import { combineReducers } from "redux";
import {
  userAuthReducer,
  apiErrorsReducer,
  userInfoReducer,
  allUsersReducer,
  userCommentInfo,
} from "./users";
import { snackbarMessage } from "./snackbar";
import postsReducer from "./posts";
const RootReducer = combineReducers({
  userAuthReducer,
  postsReducer,
  snackbar: snackbarMessage,
  singleUser: userInfoReducer,
  allUsers: allUsersReducer,
  commentUser: userCommentInfo,
  apiErrors: apiErrorsReducer,
});

export default RootReducer;
