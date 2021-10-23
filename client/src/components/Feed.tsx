import { makeStyles, Container, Theme } from "@material-ui/core";
import Post from "./Post";
import Add from "./Add";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));
function Feed() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
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
