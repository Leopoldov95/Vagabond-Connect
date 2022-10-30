import * as React from "react";
import {
  Theme,
  makeStyles,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import { MailOutline, Delete, Visibility } from "@material-ui/icons";
import { lightGreen } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "1rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: lightGreen[100],
    },
    [theme.breakpoints.down(960)]: {
      justifyContent: "center",
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-between",
      padding: "8px 1rem",
    },
  },
  avatar: {
    [theme.breakpoints.down(960)]: {
      width: 60,
      height: 60,
    },
    [theme.breakpoints.down("xs")]: {
      width: 80,
      height: 80,
    },
  },
  icon: {
    backgroundColor: "white",
    borderRadius: "50%",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  selected: {
    backgroundColor: lightGreen[300],
    color: "white",
  },
  actionContent: {
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
  userName: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down(960)]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
}));

const ListUser = ({ user, selectedUser, handleMobileNav, notifications }) => {
  const classes = useStyles();
  console.log(user);
  console.log(notifications);
  return (
    <React.Fragment>
      <li
        onClick={handleMobileNav}
        className={`${classes.listItem} ${
          user._id === selectedUser && classes.selected
        }`}
      >
        <Link to={`/messages/${user._id}`}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="account_icon"
              aria-label="account of current user"
              aria-haspopup="true"
              className={classes.avatar}
              src={user.profile_cloudinary}
            />
            <Typography className={classes.userName} variant="h6">
              {user.firstName} {user.lastName}
            </Typography>
          </div>
        </Link>
        <div className={classes.actionContent}>
          <Link to={`/profile/${user._id}`}>
            <IconButton className={classes.icon}>
              <Visibility />
            </IconButton>
          </Link>
          <Link to={`/messages/${user._id}`}>
            <IconButton className={classes.icon}>
              <MailOutline />
            </IconButton>
          </Link>
          <IconButton className={classes.icon} color="secondary">
            <Delete />
          </IconButton>
        </div>
      </li>
      <Divider />
    </React.Fragment>
  );
};

export default ListUser;
