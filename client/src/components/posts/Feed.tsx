import * as React from "react";
import { Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../actions/posts";
import Posts from "./Posts";
import PostForm from "./PostForm";
import Add from "./Add";

// there should always be posts on the feed, perhaps add some sort of error handling if no posts are available or if posts failed to load
const Feed = (props: any) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const [editPostId, setEditPostId] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);

  // this will update the React posts state to ensure that it is always populated with the posts from the db
  React.useEffect(() => {
    dispatch(getAllPosts());
  }, [editPostId, dispatch]);
  return (
    <Container>
      {user && (
        /* May want to pass User ID here */
        <Add setOpen={setOpen} />
      )}

      <Posts setEditPostId={setEditPostId} open={open} setOpen={setOpen} />
      <PostForm
        open={open}
        setOpen={setOpen}
        editPostId={editPostId}
        setEditPostId={setEditPostId}
      />
    </Container>
  );
};

export default Feed;
