import { combineReducers } from "redux";
import {
  userAuthReducer,
  apiErrorsReducer,
  userInfoReducer,
  allUsersReducer,
} from "./users";
import postsReducer from "./posts";
const RootReducer = combineReducers({
  userAuthReducer,
  postsReducer,
  singleUser: userInfoReducer,
  allUsers: allUsersReducer,
  apiErrors: apiErrorsReducer,
});

export default RootReducer;
