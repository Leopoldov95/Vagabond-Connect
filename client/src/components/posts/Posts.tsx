import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Typography } from "@material-ui/core";
import Post from "./Post";
function Posts(props: any) {
  // this is to access the posts state from the redux store
  const posts = useSelector((state: any) => state.postsReducer);
  if (posts.length > 0 && posts !== "empty") {
    posts.sort(function (a: any, b: any) {
      var keyA = new Date(a.createdAt),
        keyB = new Date(b.createdAt);
      // Compare the 2 dates
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
  }
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
    <Typography variant="h5" align="center" style={{ marginTop: 10 }}>
      No Posts Yet!
    </Typography>
  ) : (
    <Fragment>
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          setEditPostId={props.setEditPostId}
          setOpen={props.setOpen}
        />
      ))}
    </Fragment>
  );
}

export default Posts;
