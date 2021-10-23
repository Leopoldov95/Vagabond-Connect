// This will be the main index file to display the main application
// so have the sidebar and navbar componetns here and based on state, change whether to show home feed or account settings

import Navbar from "../../components/Navbar";
import LeftProfile from "../../components/LeftProfile";
import Add from "../../components/Add";
import Feed from "../../components/Feed";
import { makeStyles, Grid, Theme } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  container: {
    maxWidth: 1200,
    margin: "auto",
    paddingTop: theme.spacing(2),
  },
}));
const Main = () => {
  const classes = useStyles();
  return (
    <div className="Main">
      <Navbar />
      <Grid container className={classes.container}>
        <Grid item sm={2} xs={2}>
          <LeftProfile />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Feed />
        </Grid>
        <Grid item sm={3} className={classes.right}>
          {/*   <Rightbar /> */}
        </Grid>
      </Grid>
      <Add />
    </div>
  );
};

export default Main;
