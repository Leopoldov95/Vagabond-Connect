import {
  EDIT_USER,
  FETCH_USER,
  DELETE_USER,
  AUTH,
  LOGOUT,
  API_ERROR,
} from "../constants/actionTypes";

// Note that EDIT_User can be used in all instances in which a logged in user makes modifications to their profile
export const userAuthReducer = (state = { authData: null }, action: any) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case EDIT_USER:
      const authUser: any = localStorage.getItem("profile");
      // grab existing token, no need to generate a new one
      const { token } = JSON.parse(authUser);
      const newData = {
        result: { ...action?.data },
        token: token,
      };
      // go here Upon a successful proifle edit
      // we want to keep the local token, and overwrite the current localstorage and authData
      localStorage.setItem("profile", JSON.stringify({ ...newData }));
      return { ...state, authData: newData };
    // may want toset user as a reducer state
    //return state;
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
