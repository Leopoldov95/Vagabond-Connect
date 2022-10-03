import * as React from "react";
import {
  Theme,
  makeStyles,
  Avatar,
  IconButton,
  Typography,
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
  },
  icon: {
    backgroundColor: "white",
    borderRadius: "50%",
    padding: "6px",
    marginLeft: theme.spacing(1),
  },
  selected: {
    backgroundColor: lightGreen[300],
    color: "white",
  },
  actionContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ListUser = ({ user, selectedUser }) => {
  const classes = useStyles();
  return (
    <li
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
            src={user.profile_cloudinary}
          />
          <Typography style={{ marginLeft: 16 }} variant="h6">
            {user.firstName} {user.lastName}
          </Typography>
        </div>
      </Link>
    </li>
  );
};

export default ListUser;
