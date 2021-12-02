import { combineReducers } from "redux";
import { userAuthReducer, apiErrorsReducer } from "./users";
import postsReducer from "./posts";
const RootReducer = combineReducers({
  userAuthReducer,
  postsReducer,
  apiErrors: apiErrorsReducer,
});

export default RootReducer;
