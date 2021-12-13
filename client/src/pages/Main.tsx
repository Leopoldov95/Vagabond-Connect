// This will be the main index file to display the main application
// so have the sidebar and navbar componetns here and based on state, change whether to show home feed or account settings
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Grid, Theme } from "@material-ui/core";
import { getAllPosts } from "../actions/posts";
import LeftProfile from "../components/home/LeftProfile";
import Feed from "../components/posts/Feed";
import Rightbar from "../components/home/Rightbar";
import PostsToggle from "../components/home/PostsToggle";

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
  const userPic = useSelector((state: any) => state.userPic);
  React.useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  /*   React.useEffect(() => {
    if (user) {
      if (user.following.length > 0) {
        user.following.forEach((x) => {
          console.log(x);
        });
      }
      if (user.followers.length > 0) {
      }
      /*      console.log(user.following);
      console.log(user.followers); */
  /*   }
  }, []);  */
  return (
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
  );
};

export default Main;
