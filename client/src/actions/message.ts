import {
  FETCH_MESSAGES,
  POST_MESSAGE,
  DELETE_MESSAGE,
  FETCH_CONTACTS,
  TARGET_ID,
} from "../constants/actionTypes";
import * as api from "../api";

// MESSAGE ACTIONS
export const fetchAllContacts = () => async (dispatch: any) => {
  try {
    const { data } = await api.fetchAllContacts();
    dispatch({ type: FETCH_CONTACTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchMessageThread = (id: any) => async (dispatch: any) => {
  try {
    const { data }: any = await api.fetchMessageThread(id);
    dispatch({ type: FETCH_MESSAGES, payload: data[0] });
    dispatch({ type: TARGET_ID, payload: data[1] });
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
