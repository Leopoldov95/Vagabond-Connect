import * as React from "react";
import {
  Theme,
  makeStyles,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { MailOutline, Delete } from "@material-ui/icons";
import { lightGreen } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
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

const ListUser = ({ user }) => {
  const classes = useStyles();
  return (
    <li className={classes.listItem}>
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
      <div>
        <Link to={`/profile/${user._id}`}>
          <Button color="primary" variant="outlined">
            View Profile
          </Button>
        </Link>
        <Link to={`/messages/${user._id}`}>
          <IconButton>
            <MailOutline />
          </IconButton>
        </Link>

        <IconButton color="secondary">
          <Delete />
        </IconButton>
      </div>
    </li>
  );
};

export default ListUser;
