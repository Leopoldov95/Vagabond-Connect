import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { MailOutline, Delete } from "@material-ui/icons";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "1rem",
    "&:hover": {
      backgroundColor: lightGreen[100],
    },
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
  console.log(user);
  return (
    <Paper>
      <ul className={classes.container}>
        <li className={classes.listItem}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="account_icon"
              aria-label="account of current user"
              aria-haspopup="true"
              src={userProfile.profile_cloudinary}
            />
            <Typography style={{ marginLeft: 16 }} variant="h6">
              {userProfile.firstName} {userProfile.lastName}
            </Typography>
          </div>
          <div>
            <Link to={`/profile/${userProfile._id}`}>
              <Button color="primary" variant="outlined">
                View Profile
              </Button>
            </Link>
            <Link to={`/messages/${userProfile._id}`}>
              <IconButton>
                <MailOutline />
              </IconButton>
            </Link>

            <IconButton color="secondary">
              <Delete />
            </IconButton>
          </div>
        </li>
      </ul>
    </Paper>
  );
};

export default MessageList;
