import {
  EDIT_USER,
  FETCH_USER,
  FETCH_ALL_USER,
  DELETE_USER,
  AUTH,
  API_ERROR,
  FETCH_COMMENT_USER,
} from "../constants/actionTypes";

import * as API from "../api";

export const signin =
  (formData: any, history: any) => async (dispatch: any) => {
    try {
      // log in the user
      const { data } = await API.signin(formData);
      dispatch({ type: AUTH, data });
      // console.log(data);
      history.push("/");
    } catch (error: any) {
      dispatch({ type: API_ERROR, payload: error?.response?.data?.message });
    }
  };

export const signup =
  (formData: any, history: any) => async (dispatch: any) => {
    try {
      // sign up the user
      const { data } = await API.signup(formData);

      dispatch({ type: AUTH, data });

      history.push("/");
    } catch (error: any) {
      //console.log(error);
      dispatch({ type: API_ERROR, payload: error?.response?.data?.message });
    }
  };
export const editProfileImg = (formData: any) => async (dispatch: any) => {
  try {
    // remember to use an AUTH middleware in this process,
    // may want to return back user AUTH profile, also to reset JWT token
    // delete existing img by using cloud id
    // create cloud img

    // may want to host default default bg image for ALL users and use it during creation process
    const { data } = await API.editProfileImg(formData);
    dispatch({ type: EDIT_USER, data });

    // may need to change location to reflect change in real time
  } catch (error: any) {
    if (error?.response?.data?.message) {
      dispatch({ type: API_ERROR, payload: error?.response?.data?.message });
    } else {
      dispatch({ type: API_ERROR, payload: "Something Went Wrong..." });
    }
  }
};

export const editUserDetails = (formData: any) => async (dispatch: any) => {
  try {
    //console.log(formData);
    const { data } = await API.editUserDetails(formData);
    dispatch({ type: EDIT_USER, data });
  } catch (error: any) {
    if (error?.response?.data?.message) {
      dispatch({ type: API_ERROR, payload: error?.response?.data?.message });
    } else {
      dispatch({ type: API_ERROR, payload: "Something Went Wrong..." });
    }
  }
};

export const getSingleUser = (id: any) => async (dispatch: any) => {
  try {
    const { data } = await API.fetchSingleUser({ id });
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers =
  (id: any = 0, action: any = "find", skip: any = 0) =>
  async (dispatch: any) => {
    try {
      // console.log(id, action, skip);
      const { data } = await API.fetchAllUsers(id, action, skip);
      //console.log(data);
      dispatch({ type: FETCH_ALL_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

// follow a user
// for now, no permission is required
// if we want privacy, there must be a value on the sender/user that shows sent requests, and a value on the receiever that shows pending requests

export const followUser = (id: any) => async (dispatch: any) => {
  try {
    // so we want to follow a user - need params
    console.log(id);
    const { data } = await API.followUser(id);
    dispatch({ type: EDIT_USER, data });
    // users following must be updated - for updating, we will push the _id onto the array
    // receivers followers must be updated - for updating, we will push the _id onto the array
    // will need auth middleware
    // need to updated the current authenticated user reducer
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserCommentInfo = (id: any) => async (dispatch: any) => {
  try {
    //console.log(id); // needs to be comment owner
    const { data } = await API.fetchUserCommentInfo(id);

    const user = {
      user: id,
      data: data,
    };
    //console.log(user);
    //console.log(data);
    dispatch({ type: FETCH_COMMENT_USER, payload: user });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserCountryList =
  (name: String, formData: any) => async (dispatch: any) => {
    try {
      const { data } = await API.editUserCountryList(name, formData);
      dispatch({ type: EDIT_USER, data });
    } catch (error) {
      console.log(error);
    }
  };
