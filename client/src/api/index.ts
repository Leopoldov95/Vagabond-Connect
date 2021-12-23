import axios from "axios";

// so by using this url, we can use the backend logic
const API = axios.create({
  baseURL: "http://localhost:5001",
});
// this function will run on every request, it's helping the middleware function
API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("profile")) {
    let JSONData: any = localStorage.getItem("profile");
    ////// due to how headers are handled, VAR NAMES AFTER req MUST BE IN LOWERCASE ///////
    // name of a property must match!!! Authorization !== authorization
    req.headers.authorization = `Bearer ${JSON.parse(JSONData).token}`;
  }

  return req;
});

// USERS Routes
// authentication
export const signup = (formData: any) => API.post("/users/signup", formData);
export const signin = (formData: any) => API.post("/users/signin", formData);
// user
export const editUserDetails = (formData: any) => API.post("/users", formData);
export const fetchSingleUser = (id: any) => API.post("/users/single", id);
export const fetchAllUsers = (params: any) => API.get(`/users/${params}`);
export const editProfileImg = (data: any) =>
  API.patch(`/users/${data?.user?._id}/profileImg`, data); // might want to redo this route
export const followUser = (id: any) => API.post(`users/follow/${id}`); // might not need post but patch
export const fetchUserCommentInfo = (id: any) => API.get(`users/comment/${id}`);
export const editUserCountryList = (name: String, formData: any) =>
  API.patch(`users/list/${name}`, formData);
///////////////////
// POSTS routes
/* export const fetchPosts = (id: any = 0, filter: any = 0, skip: any = 0) =>
  API.get(`/posts/${id}/${filter}/${skip}`); */
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
