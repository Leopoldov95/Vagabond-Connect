// Posts reducers
import {
  FETCH_MESSAGES,
  POST_MESSAGE,
  DELETE_MESSAGE,
} from "../constants/actionTypes";

const messageReducer = (messages: any = [], action: any) => {
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

export default messageReducer;
