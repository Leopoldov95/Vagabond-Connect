import { Container } from "@material-ui/core";
import Post from "./Post";
import Add from "./Add";

// there should always be posts on the feed, perhaps add some sort of error handling if no posts are available or if posts failed to load
const Feed = (props: any) => {
  return (
    <Container>
      <Add />
      {props.posts.map((post: any) => (
        <Post post={post} />
      ))}
    </Container>
  );
};

export default Feed;