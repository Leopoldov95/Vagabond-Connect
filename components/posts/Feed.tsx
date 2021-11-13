import { Container } from "@material-ui/core";
import Post from "./Post";
import Add from "./Add";

function Feed() {
  return (
    <Container>
      <Add />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Container>
  );
}

export default Feed;
