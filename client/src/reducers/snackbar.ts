import {
  SNACKBAR_SUCCESS,
  SNACKBAR_CLEAR,
  SNACKBAR_WARNING,
  SNACKBAR_ERROR,
} from "../constants/actionTypes";
export const snackbarMessage = (state = {}, action: any) => {
  switch (action.type) {
    case SNACKBAR_SUCCESS:
      return { message: action?.payload, type: "success" };
    case SNACKBAR_WARNING:
      return { message: action?.payload, type: "warning" };
    case SNACKBAR_ERROR:
      return { message: action?.payload, type: "error" };
    case SNACKBAR_CLEAR:
      return {};
    default:
      return state;
  }
};
