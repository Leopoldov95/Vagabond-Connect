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
import SnackbarTool from "../components/snackbar/SnackbarTool";
import LoadMore from "../components/posts/LoadMore";
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
  const currentPosts = useSelector((state: any) => state.postsReducer);
  const [filter, setFilter] = React.useState(""); // any filter used in order to fetch posts based on continent, must consider that will need to take all vs following posts to consider
  const [toggle, setToggle] = React.useState(true);
  const firstUpdate = React.useRef(true);
  /*   React.useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  React.useEffect(() => {
    if (filter.length > 0) {
      dispatch(getAllPosts());
    }
  }, [filter]);
  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (user) {
      toggle ? dispatch(getAllPosts()) : dispatch(getAllPosts(user._id));
    }
  }, [toggle]); */
  // this will be used to handle the filter formdata
  React.useEffect(() => {
    const filterForm = {};
    if (filter.length > 0) {
      filterForm["continentFilter"] = filter;
    }
    if (user && !toggle) {
      filterForm["userId"] = user._id;
    }
    dispatch(getAllPosts(filterForm));
  }, [dispatch, filter, toggle]);
  // dispatch
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
        {user && <PostsToggle toggle={toggle} setToggle={setToggle} />}
        <Feed />
        <LoadMore filter={filter} />
      </Grid>
      <Grid item sm={3} className={classes.right}>
        <Rightbar filter={filter} setFilter={setFilter} />
      </Grid>
      <SnackbarTool />
    </Grid>
  );
};

export default Main;
