// This will be the main index file to display the main application
// so have the sidebar and navbar componetns here and based on state, change whether to show home feed or account settings
import * as React from "react";
import LeftProfile from "../components/home/LeftProfile";
import Feed from "../components/posts/Feed";
import Rightbar from "../components/home/Rightbar";
import { makeStyles, Grid, Theme } from "@material-ui/core";
import DUMMY_POSTS from "../testData/posts";
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
const Main = (props: any) => {
  const [filter, setFilter] = React.useState(null);
  const classes = useStyles();
  return (
    <div className="Main">
      <Grid container className={classes.container}>
        <Grid item sm={2} xs={2}>
          <LeftProfile />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Feed posts={props.posts} />
        </Grid>
        <Grid item sm={3} className={classes.right}>
          <Rightbar filter={filter} setFilter={setFilter} />
        </Grid>
      </Grid>
    </div>
  );
};

export async function getStaticProps() {
  // fetch data from an API

  // ALWAYS NEED TO RETURN AN {}
  return {
    props: {
      posts: DUMMY_POSTS,
    },
  };
}

export default Main;
