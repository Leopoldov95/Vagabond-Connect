// This will be the main index file to display the main application
// so have the sidebar and navbar componetns here and based on state, change whether to show home feed or account settings
import * as React from "react";
import { useDispatch } from "react-redux";
import LeftProfile from "../components/home/LeftProfile";
import Feed from "../components/posts/Feed";
import Rightbar from "../components/home/Rightbar";
import PostsToggle from "../components/home/PostsToggle";
import { makeStyles, Grid, Theme } from "@material-ui/core";
import { getAllPosts } from "../actions/posts";
const useStyles = makeStyles((theme: Theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  container: {
    padding: "0 1rem",
    marginTop: theme.spacing(10),
  },
}));
const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  /*   React.useEffect(() => {
    dispatch(getAllPosts());
  }, [editPostId, dispatch]); */
  React.useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <div className="Main">
      <Grid container className={classes.container}>
        <Grid item sm={2} xs={2}>
          <LeftProfile />
        </Grid>
        <Grid item sm={7} xs={10}>
          {user && <PostsToggle />}
          <Feed />
        </Grid>
        <Grid item sm={3} className={classes.right}>
          <Rightbar />
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
