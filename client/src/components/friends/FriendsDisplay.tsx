// here we want to display all friends based on navigation selection
import { makeStyles, Theme, Typography } from "@material-ui/core";
import * as React from "react";
import FriendCard from "./FriendCard";
import DUMMY_USERS from "../../testData/users";
//const currUser = DUMMY_USERS[0];
// will want to change key to userid
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(4),
    display: "flex",
  },
}));

const FriendsDisplay = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {(props.selected === "followers" || props.selected === "following") && (
        <Typography>{props.selected}</Typography>
      )}
      {props.selected === "all" &&
        DUMMY_USERS.map((user) => (
          <FriendCard key={user.firstName} user={user} />
        ))}
    </div>
  );
};

export default FriendsDisplay;
