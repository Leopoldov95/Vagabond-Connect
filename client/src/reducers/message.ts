// Posts reducers
import {
  FETCH_MESSAGES,
  POST_MESSAGE,
  DELETE_MESSAGE,
  TARGET_ID,
  FETCH_CONTACTS,
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
    default:
      return contacts;
  }
};
