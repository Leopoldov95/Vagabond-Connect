import * as React from "react";
import { makeStyles, Theme, Grid } from "@material-ui/core";
import FriendsNav from "../components/friends/FriendsNav";
import FriendsDisplay from "../components/friends/FriendsDisplay";
const useStyles = makeStyles((theme: Theme) => ({
  container: {},
}));
const Friends = () => {
  const [selected, setSelected] = React.useState("all");
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item sm={3}>
          <FriendsNav setSelected={setSelected} />
        </Grid>
        <Grid item sm={9}>
          <FriendsDisplay selected={selected} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Friends;
