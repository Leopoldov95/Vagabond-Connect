// here we want to display all friends based on navigation selection
import {
  makeStyles,
  Theme,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FriendCard from "./FriendCard";
import DUMMY_USERS from "../../testData/users";
//const currUser = DUMMY_USERS[0];
// will want to change key to userid
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(4),
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
}));

const FriendsDisplay = (props: any) => {
  const classes = useStyles();
  const allUsers = useSelector((state: any) => state.allUsers);
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  // If a user is logged in, their profile card won't be shown here as it is redundant
  useEffect(() => {
    props.setLoading(false);
  }, [allUsers]);
  const renderUsers = user
    ? allUsers.filter((userCard) => userCard._id !== user._id)
    : allUsers;
  return (
    <div className={classes.container}>
      <Grid container>
        {user ? (
          renderUsers.length > 0 ? (
            renderUsers.map((user) => (
              <Grid item>
                <FriendCard key={user.firstName} user={user} />
              </Grid>
            ))
          ) : (
            <Typography>No One Here!</Typography>
          )
        ) : (
          <Typography>Create An Account To Use This Feature</Typography>
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
    </div>
  );
};

export default FriendsDisplay;
