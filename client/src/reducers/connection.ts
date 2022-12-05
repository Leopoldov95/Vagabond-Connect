import { CONNECTION_CHECK } from "../constants/actionTypes";

export const connectionReducer = (state: any = null, action: any) => {
  switch (action.type) {
    case CONNECTION_CHECK:
      return action.payload;
    default:
      return state;
  }
};
