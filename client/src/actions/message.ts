import {
  FETCH_MESSAGES,
  POST_MESSAGE,
  DELETE_CONTACT,
  FETCH_CONTACTS,
  TARGET_ID,
  UPDATE_MSG_NOTIFICATIONS,
  EDIT_USER,
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
    dispatch({ type: FETCH_MESSAGES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const postMessage =
  (id: any, formData: any) => async (dispatch: any) => {
    try {
      const { data }: any = await api.postMessage(id, formData);
      const { updatedMessages, user } = data;
      // if we did not have to update the user DB collection
      if (!user) {
        dispatch({ type: POST_MESSAGE, payload: updatedMessages });
        // else if we DID have to update the users DB collection
      } else {
        console.log("triigered special effect");
        // update the contact list to reflect the new users added to message list
        const updatedMessageRoom = await api.fetchAllContacts();
        dispatch({ type: FETCH_CONTACTS, payload: updatedMessageRoom.data });
        dispatch({ type: POST_MESSAGE, payload: updatedMessages });
        // dispatch({type:})
      }
      // dispatch({ type: POST_MESSAGE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

// this method will remove a specified user from the message notification array
export const removeMessageNotification =
  (id: String) => async (dispatch: any) => {
    try {
      // here we will recieve the user data with the appropriate message notification ID removed
      const { data }: any = await api.updateMessageNotification(id);
      // console.log(data);
      //
      dispatch({
        type: UPDATE_MSG_NOTIFICATIONS,
        payload: data.messageNotifications,
      });
    } catch (error) {
      console.log(error);
    }
  };

// this functions removes the message thread
export const deleteMessageThread =
  (roomId: String) => async (dispatch: any) => {
    try {
      const { data }: any = await api.deleteMessageThread(roomId);

      dispatch({
        type: DELETE_CONTACT,
        payload: roomId,
      });
    } catch (error) {
      console.log(error);
    }
  };
// this will trigger when clicking on the user thread
// will also need to update when a user logs in, a change is made to ther users db, and when a socket event occurs
// export const updateMessageNotification =
//   (roomId: any) => async (dispatch: any) => {
//     try {
//       //const {data} = api call
//       //dispatch(type: UPDATE_MSG_NOTIFICATIONS, payload: data)
//     } catch (error) {
//       console.log(error);
//     }
//   };
// export const deleteMessageThread = (id: any) => async (dispatch: any) => {};
