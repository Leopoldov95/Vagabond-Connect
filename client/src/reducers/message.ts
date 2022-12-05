// Posts reducers
import {
  FETCH_MESSAGES,
  POST_MESSAGE,
  DELETE_CONTACT,
  TARGET_ID,
  FETCH_CONTACTS,
  UPDATE_MSG_NOTIFICATIONS,
  CLEAR_MSG_NOTIFICATIONS,
  UPDATE_CONTACT_SOCKET,
} from "../constants/actionTypes";

export const messageReducer = (messages: any = [], action: any) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return action.payload;
    case POST_MESSAGE:
      return action.payload;
    default:
      return messages;
      break;
  }
};

export const contactsReducer = (contacts: any = [], action: any) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return action.payload;
    case UPDATE_CONTACT_SOCKET:
      return action.payload;
    case DELETE_CONTACT:
      contacts = contacts.filter(
        (contact: any) => contact.messageRoom !== action.payload
      );
      return contacts;
    default:
      return contacts;
  }
};

/// not sure why but this is crashing the app
export const msgNotificationReducer = (
  notifications: any = {},
  action: any
) => {
  switch (action.type) {
    case UPDATE_MSG_NOTIFICATIONS:
      return action.payload;
    case CLEAR_MSG_NOTIFICATIONS:
      return [];
    default:
      return notifications;
  }
  // switch (action.type) {
  //   case UPDATE_MSG_NOTIFICATIONS:
  //     return action.payload;
  //   default:
  //     return null;
  // }
};
