import { combineReducers } from "redux";
import { userAuthReducer, apiErrorsReducer } from "./users";
const RootReducer = combineReducers({
  userAuthReducer,
  apiErrors: apiErrorsReducer,
});

export default RootReducer;
