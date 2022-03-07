import {
  FETCH_MESSAGES,
  POST_MESSAGE,
  DELETE_MESSAGE,
} from "../constants/actionTypes";
import * as api from "../api";

// MESSAGE ACTIONS
export const fetchMessageThread = (id: any) => async (dispatch: any) => {
  try {
    const { data } = await api.fetchMessageThread(id);

    dispatch({ type: FETCH_MESSAGES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const postMessage =
  (id: any, formData: any) => async (dispatch: any) => {
    try {
      const { data } = await api.postMessage(id, formData);
      dispatch({ type: POST_MESSAGE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
// export const deleteMessageThread = (id: any) => async (dispatch: any) => {};
