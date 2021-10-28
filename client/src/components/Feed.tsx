import { makeStyles, Container, Theme } from "@material-ui/core";
import Post from "./Post";
import Add from "./Add";

const useStyles = makeStyles((theme: Theme) => ({}));
function Feed() {
  const classes = useStyles();
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
