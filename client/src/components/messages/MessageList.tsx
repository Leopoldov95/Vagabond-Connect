import * as React from "react";
import { useSelector } from "react-redux";
import { Paper, makeStyles, Theme } from "@material-ui/core";
import ListUser from "./ListUser";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(9),
  },
}));
const MessageList = () => {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const userProfile = useSelector((state: any) => state.singleUser);
  const classes = useStyles();
  // since we will only be messaging one user at a time, we can do the following
  // on page load, start to populate the current message p[age wioth existing messages from the authenticate user
  // put the user I am currently messagind id onto the url
  // ecery time I want to view messages from another user, I click their icon and will make an api call to the server t retrieve that partcular user
  // messages must be ordered from most recent to oldest
  // for now, the only wayt to start a messaging thread is to start a mwssage by ivisitng the users profile

  // have the current user I'm messaging be highlighted
  return (
    <Paper>
      <ul className={classes.container}></ul>
    </Paper>
  );
};

export default MessageList;
