import { IS_MORE_POSTS, IS_MORE_USERS } from "../constants/actionTypes";

export const isMorePostsReducer = (state = true, action: any) => {
  switch (action.type) {
    case IS_MORE_POSTS:
      return action?.payload;
    default:
      return state;
  }
};
export const isMoreUsersReducer = (state = true, action: any) => {
  switch (action.type) {
    case IS_MORE_USERS:
      return action?.payload;
    default:
      return state;
  }
};
