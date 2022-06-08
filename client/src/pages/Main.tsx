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
  filterMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      marginBottom: theme.spacing(12),
      marginTop: "-65px",
    },
  },
  container: {
    padding: "0 1rem",
    marginTop: theme.spacing(10),
    [theme.breakpoints.down(450)]: {
      padding: 0,
    },
  },
}));
const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const currentPosts = useSelector((state: any) => state.postsReducer);
  const [filter, setFilter] = React.useState(""); // any filter used in order to fetch posts based on continent, must consider that will need to take all vs following posts to consider
  const [toggle, setToggle] = React.useState(true);
  const firstUpdate = React.useRef(true);
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

  return (
    <Grid container className={classes.container}>
      <Grid item md={2} sm={4} xs={12}>
        <LeftProfile />
      </Grid>
      <Grid item md={7} sm={8} xs={12}>
        <div className={classes.filterMobile}>
          <Rightbar filter={filter} setFilter={setFilter} />
        </div>
        {user && <PostsToggle toggle={toggle} setToggle={setToggle} />}
        <Feed />
        <LoadMore filter={filter} toggle={toggle} />
      </Grid>
      <Grid item md={3} className={classes.right}>
        <Rightbar filter={filter} setFilter={setFilter} />
      </Grid>
      <SnackbarTool />
    </Grid>
  );
};

export default Main;
