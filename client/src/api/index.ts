import axios from "axios";
//export const baseURL = "https://vagabond-connect-api.herokuapp.com/";
export const baseURL = "http://localhost:5000";
// so by using this url, we can use the backend logic
export const API = axios.create({
  baseURL,
});
// this function will run on every request, it's helping the middleware function
API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("vagabond_connect_profile")) {
    let JSONData: any = localStorage.getItem("vagabond_connect_profile");
    ////// due to how headers are handled, VAR NAMES AFTER req MUST BE IN LOWERCASE ///////
    // name of a property must match!!! Authorization !== authorization
    req.headers.authorization = `Bearer ${JSON.parse(JSONData).token}`;
  }

  return req;
});

// Integrity
export const connectionCheck = () => API.get("/");

// USERS Routes
// authentication
export const signup = (formData: any) => API.post("/users/signup", formData);
export const signin = (formData: any) => API.post("/users/signin", formData);
// user
export const editUserDetails = (formData: any) => API.post("/users", formData);
export const fetchSingleUser = (id: any) => API.post("/users/single", id); // why a POST request?
export const fetchAllUsers = (params: any) => API.get(`/users/${params}`);
export const fetchAllFollowers = () => API.get("/users/get/followers");
export const fetchAllFollowing = () => API.get("/users/get/following");
export const searchUsers = (name: any) => API.get(`/users/search/${name}`);
export const editProfileImg = (data: any) =>
  API.patch(`/users/${data?.user?._id}/profileImg`, data); // might want to redo this route
export const followUser = (id: any) => API.post(`users/follow/${id}`); // might not need post but patch
export const fetchUserCommentInfo = (id: any) => API.get(`users/comment/${id}`);
export const editUserCountryList = (name: String, formData: any) =>
  API.patch(`users/list/${name}`, formData);
export const deleteUser = (id: any, password: any) =>
  API.post(`users/delete/${id}`, password);
///////////////////
// POSTS routes
export const fetchAllPosts = (params: any) => API.get(`/posts/${params}`); // This route will be used to handle fetching all posts and applying filters
export const fetchUserPosts = (id: any) => API.get(`/posts/user/${id}`);
export const createPost = (newPost: any) => API.post("/posts/create", newPost);
//export const deletePost = (id: any) => API.delete("posts", id)
export const updatePost = (id: any, updatedPost: any) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: any) => API.delete(`/posts/${id}`);
export const likePost = (id: any) => API.patch(`/posts/likePost/${id}`);

// COMMENTS routes
export const createComment = (id: any, formData: any) =>
  API.patch(`/posts/comment/create/${id}`, formData);
export const editComment = (formData: any, postId: any, commentId: any) =>
  API.patch(`/posts/comment/edit/${postId}/${commentId}`, formData);
export const deleteComment = (postId: any, commentId: any) =>
  API.patch(`/posts/comment/delete/${postId}/${commentId}`);
/////// NOTE
// When updating a post, either by patch or put, must provide params, better practive

// MESSAGE ROUTES
// Note to self, wrapping function in {} WILL NOT RETURN the results
export const fetchAllContacts = () => API.get("message/get/all");
export const fetchMessageThread = (id: any) => API.get(`/message/get/${id}`);
export const postMessage = (id: any, formData: any) =>
  API.post(`/message/post/${id}`, formData);

export const deleteMessageThread = (id: any) =>
  API.delete(`/message/delete/${id}`);

// NOTIFICATION ROUTES

export const clearNotifications = (id: any) =>
  API.patch(`/users/patch/clearNotification/${id}`);
