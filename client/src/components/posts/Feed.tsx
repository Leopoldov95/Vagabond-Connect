import * as React from "react";
import { Container, makeStyles, Theme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Posts from "./Posts";
import PostForm from "./PostForm";
import Add from "./Add";

const useStyles = makeStyles((theme: Theme) => ({
  profileContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: theme.spacing(2),
    alignItems: "baseline",
    [theme.breakpoints.down(900)]: {
      gridTemplateColumns: "1fr",
    },
  },
}));

// there should always be posts on the feed, perhaps add some sort of error handling if no posts are available or if posts failed to load
const Feed = (props: any) => {
  const classes = useStyles();
  const params = useParams();
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const userProfile = useSelector((state: any) => state.singleUser);
  let displayUser = Object.keys(userProfile).length > 0 ? userProfile : user;
  const [editPostId, setEditPostId] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  // no params, so we are at home page, so for the purpose of whether or not to render the <Add/> component, we don't ned to make the comparison on the Home page
  if (!(Object.keys(params).length > 0)) {
    displayUser = user;
  }

  // this will update the React posts state to ensure that it is always populated with the posts from the db
  return (
    <Container>
      {user && user?._id === displayUser?._id ? (
        /* May want to pass User ID here */
        <Add setOpen={setOpen} />
      ) : (
        ""
      )}
      {props.isProfile ? (
        <div className={classes.profileContainer}>
          <Posts
            isProfile={true}
            setEditPostId={setEditPostId}
            open={open}
            setOpen={setOpen}
          />
        </div>
      ) : (
        <Posts setEditPostId={setEditPostId} open={open} setOpen={setOpen} />
      )}
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
