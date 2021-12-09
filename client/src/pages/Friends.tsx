import { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, Theme, Grid } from "@material-ui/core";
import FriendsNav from "../components/friends/FriendsNav";
import FriendsDisplay from "../components/friends/FriendsDisplay";
import { getAllUsers } from "../actions/users";
const useStyles = makeStyles((theme: Theme) => ({
  container: {},
}));
const Friends = () => {
  /*  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState("find");
  // everytime the nac changes, make a fetch
  React.useEffect(() => {
    // No user is logged in
    if (!user) {
      dispatch(getAllUsers());
    } else {
      dispatch(getAllUsers(user?._id, selected));
    }
  }, [selected]); */
  // need user info to find followers and following
  // need to fetch all users, we only need profile pic and userId
  // for users as well as posts, will need to add pagination in the future for performance
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item sm={3}>
          <FriendsNav setLoading={setLoading} />
        </Grid>
        <Grid item sm={9}>
          <FriendsDisplay loading={loading} setLoading={setLoading} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Friends;
