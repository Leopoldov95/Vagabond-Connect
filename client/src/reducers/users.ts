import {
  EDIT_USER,
  FETCH_USER,
  DELETE_USER,
  AUTH,
  LOGOUT,
  API_ERROR,
  FETCH_ALL_USER,
  FETCH_COMMENT_USER,
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

// which user to display on profile page
export const userInfoReducer = (user: any = [], action: any) => {
  switch (action.type) {
    case FETCH_USER:
      return action?.payload;
    default:
      return user;
  }
};

// gets all users to show in friends page and profile page
// when fetching from profile page, may only want to retrieve following and followers
export const allUsersReducer = (users: any = [], action: any) => {
  switch (action.type) {
    case FETCH_ALL_USER:
      return action?.payload;
    default:
      return users;
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

// this reducer has a main purpose of fetching the commentors profil img
export const userCommentInfo = (userImg: any = new Map(), action: any) => {
  switch (action.type) {
    case FETCH_COMMENT_USER:
      return userImg.set(`${action?.payload?.user}`, action?.payload?.data);
    // return [...userImg, action?.payload];
    default:
      return userImg;
  }
};
