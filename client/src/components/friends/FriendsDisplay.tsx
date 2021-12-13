// here we want to display all friends based on navigation selection
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  makeStyles,
  Theme,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import FriendCard from "./FriendCard";
// will want to change key to userid
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(4),
    display: "flex",
    position: "relative",
  },
  profileContainer: {
    padding: "0 1rem",
    display: "flex",
    position: "relative",
  },
  overlayLoader: {
    position: "absolute",
    left: 0,
    top: 16,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "&::before": {
      content: '""',
      backgroundColor: "white",
      opacity: 0.6,
      height: "100%",
      width: "100%",
    },
  },
  noUser: {
    margin: "auto",
    color: "gray",
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  empty: {
    color: "gray",
    marginTop: theme.spacing(2),
  },
}));

const FriendsDisplay = (props: any) => {
  const classes = useStyles();
  const params = useParams();
  const { id }: any = params; // Need this to determin if viewing friends on Friends Page OR from Profile
  const allUsers = useSelector((state: any) => state.allUsers);
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  // If a user is logged in, their profile card won't be shown here as it is redundant
  React.useEffect(() => {
    props.setLoading(false);
  }, [allUsers]);
  // this filters out the logged in users profile card
  const renderUsers =
    user && !id
      ? allUsers.filter((userCard) => userCard._id !== user._id)
      : allUsers;
  return (
    <Grid
      container
      className={id ? classes.profileContainer : classes.container}
    >
      {props.selected === "find" ? (
        renderUsers.length > 0 ? (
          renderUsers.map((user) => (
            <Grid item key={user.firstName}>
              <FriendCard user={user} />
            </Grid>
          ))
        ) : (
          <Typography variant="h4" className={classes.empty}>
            No One Here
          </Typography>
        )
      ) : user ? (
        renderUsers.length > 0 ? (
          renderUsers.map((user) => (
            <Grid item>
              <FriendCard key={user.firstName} user={user} />
            </Grid>
          ))
        ) : (
          <Typography variant="h4" className={classes.empty}>
            No One Here
          </Typography>
        )
      ) : (
        <div className={classes.noUser}>
          <Typography variant="h5" gutterBottom>
            Create An Account To Use This Feature
          </Typography>
          <Lock fontSize="large" />
        </div>
      )}

      {props.loading && (
        <div className={classes.overlayLoader}>
          <CircularProgress
            size={60}
            style={{ position: "absolute", zIndex: 10 }}
          />
        </div>
      )}
    </Grid>
  );
};

export default FriendsDisplay;
