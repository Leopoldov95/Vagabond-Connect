import {
  EDIT_USER,
  FETCH_USER,
  DELETE_USER,
  AUTH,
  LOGOUT,
  API_ERROR,
} from "../constants/actionTypes";

export const userAuthReducer = (state = { authData: null }, action: any) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      console.log(state);
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear(); // clears the entire local storage, needed to remove user from localStorage
      return { ...state, authData: action?.data };
    default:
      return state;
      break;
  }
};

export const apiErrorsReducer = (apiErrors = null, action: any) => {
  switch (action.type) {
    case API_ERROR:
      return action.payload;

    default:
      return apiErrors;
      break;
  }
};
