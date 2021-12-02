import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import Post from "./Post";
function Posts(props: any) {
  // this is to access the posts state rom the redux store
  const posts = useSelector((state: any) => state.postsReducer);
  //const classes = useStyles();
  // console.log(posts);
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
  ) : (
    <Fragment>
      {posts.map((post) => (
        <Post
          post={post}
          setEditPostId={props.setEditPostId}
          setOpen={props.setOpen}
        />
      ))}
    </Fragment>
  );
}

export default Posts;
