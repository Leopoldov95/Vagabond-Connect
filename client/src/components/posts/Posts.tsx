import * as React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Post from "./Post";
function Posts(props: any) {
  const loadingCards = [1, 2, 3, 4];
  // this is to access the posts state from the redux store
  const posts = useSelector((state: any) => state.postsReducer);
  // remember that mongodb can sort for you

  return !posts.length ? (
    <React.Fragment>
      {loadingCards.map((item) => (
        <Card key={item} style={{ marginBottom: "1.5rem" }}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          <Skeleton
            animation="wave"
            variant="rect"
            style={{ height: "250px" }}
          />
          <CardContent>
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
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
          isProfile={props.isProfile}
        />
      ))}
    </React.Fragment>
  );
}

export default Posts;
