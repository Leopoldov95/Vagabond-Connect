import * as React from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Typography } from "@material-ui/core";
import Post from "./Post";
function Posts(props: any) {
  // this is to access the posts state from the redux store
  const posts = useSelector((state: any) => state.postsReducer);
  // remember that mongodb can sort for you

  return !posts.length ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <CircularProgress size={60} />
    </div>
  ) : posts === "empty" ? (
    <Typography
      variant="h5"
      align="center"
      style={{ marginBottom: 16, marginTop: 32, color: "gray" }}
    >
      No Posts Yet!
    </Typography>
  ) : (
    <React.Fragment>
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          setEditPostId={props.setEditPostId}
          setOpen={props.setOpen}
        />
      ))}
    </React.Fragment>
  );
}

export default Posts;
