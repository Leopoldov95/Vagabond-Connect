import {
  EDIT_USER,
  FETCH_USER,
  DELETE_USER,
  AUTH,
  API_ERROR,
} from "../constants/actionTypes";

import * as API from "../api";
import { promisify } from "util";

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
export const editProfileImg = (data: any) => async (dispatch: any) => {
  try {
    // remember to use an AUTH middleware in this process,
    // may want to return back user AUTH profile, also to reset JWT token
    // delete existing img by using cloud id
    // create cloud img

    // may want to host default default bg image for ALL users and use it during creation process
    await API.editProfileImg(data);
  } catch (error) {}
};
/* 
export const signup = async (formData: any, history: any) => {
  try {
    const data = await API.signup(formData);
    console.log(data);

    //localStorage.setItem("userProfile", JSON.stringify(data));

    //history.push("/");
  } catch (error) {
    console.error(error);
    /*  if (error.response && error.response.data) {
       // alert(error.response.data.message) // some reason error message
       return  error.response.data.message;
      } */
/*   }
};
 */
