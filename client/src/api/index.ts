import axios from "axios";

// so by using this url, we can use the backend logic
const API = axios.create({
  baseURL: "http://localhost:5000",
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

// auth/user routes
export const signup = (formData: any) => API.post("/users/signup", formData);
export const signin = (formData: any) => API.post("/users/signin", formData);
export const editProfileImg = (data: any) =>
  API.patch(`/users/${data?.user?._id}/profileImg`, data);

// posts routes
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost: any) => API.post("/posts", newPost);
export const updatePost = (id: any, updatedPost: any) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: any) => API.delete(`/posts/${id}`);
//export const likePost = (id: any) => API.patch(`/posts/${id}/likePost`);

// comments routes
