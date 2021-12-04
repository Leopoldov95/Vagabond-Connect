export const FETCH_ALL_POSTS = "FETCH_ALL_POSTS"; // retrieve all posts
export const FETCH_USER_POSTS = "FETCH_USER_POSTS"; // retrieve all users posts
export const CREATE_POST = "CREATE_POST"; // create a post, user MUST be logged in
export const DELETE_POST = "DELETE_POST"; // delete a post, user MUST be logged in and can ONLY delete their own posts
export const EDIT_POST = "EDIT_POST"; // change the content of a post, user MUST be logged in and can ONLY edit their own posts
export const EDIT_POST_AVATAR = "EDIT_POST_AVATAR"; // a special action to update the avatar of all posts when owner changes their profile picture
export const DELETE_USER = "DELETE_USER"; // delete the current user, user MUST be logged in
export const CREATE_USER = "CREATE_USER"; // create a user, only allowed if no user is logged in
export const EDIT_USER = "EDIT_USER"; // edit user info, user MUST be logged in and can ONLY delete their own account
export const FETCH_USER = "FETCH_USER"; // look for users, specific or otherwise
export const CREATE_COMMENT = "CREATE_COMMENT"; // create a comment, user MUST be logged in
export const DELETE_COMMENT = "DELETE_COMMENT"; // delete a comment, user MUST be logged in and can ONLY delete their own comment
export const EDIT_COMMENT = "EDIT_COMMENT"; // edit a comment, user MUST be logged in and can ONLY edit their own comment
export const LOGOUT = "LOGOUT"; // logout, user MUST be logged in
export const AUTH = "AUTH"; // check authentication
export const API_ERROR = "API_ERROR"; // check authentication
