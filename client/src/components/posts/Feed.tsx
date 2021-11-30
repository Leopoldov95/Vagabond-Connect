import { Container } from "@material-ui/core";
import Post from "./Post";
import Add from "./Add";
import DUMMY_POSTS from "../../testData/posts";

// there should always be posts on the feed, perhaps add some sort of error handling if no posts are available or if posts failed to load
const Feed = (props: any) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Container>
      {user && (
        /* May want to pass User ID here */
        <Add />
      )}

      {DUMMY_POSTS.map((post: any) => (
        <Post post={post} key={post?.title} />
      ))}
    </Container>
  );
};

export default Feed;
