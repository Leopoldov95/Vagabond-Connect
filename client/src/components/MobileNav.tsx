import * as React from "react";
import countries from "./country/countries";
import {
  Paper,
  Theme,
  makeStyles,
  Avatar,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  Home,
  LibraryBooks,
  Person,
  Lock,
  Settings,
  ExitToApp,
  Group,
} from "@material-ui/icons";
import { lightGreen, indigo, red } from "@material-ui/core/colors";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  mobileMenu: {
    position: "absolute",
    top: theme.spacing(7),
    width: "90%",
    backgroundColor: "white",
    height: "calc(100vh - 56px)",
    transition: "all ease-in-out 200ms",
  },
  mobileHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  profileImg: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(1),
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: lightGreen[500],
    padding: "12px 2.5rem",
    gap: theme.spacing(4),
  },
  text: {
    fontWeight: 500,
    fontSize: 14,
  },
  bioText: {
    display: "flex",
    alignItems: "center",
    color: "#555",
    gap: theme.spacing(2),
  },
  flag: {
    width: "30px",
  },
}));

export const MobileNav = ({ active, setActive, logout }) => {
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const classes = useStyles();
  const location = useLocation();
  React.useEffect(() => {
    setActive(false);
  }, [location]);
  return (
    <Paper
      className={classes.mobileMenu}
      style={{ right: active ? 0 : "-125%" }}
    >
      {/* Profile information */}
      <div className={classes.mobileHeader}>
        <Avatar
          className={classes.profileImg}
          alt="account_icon"
          aria-label="account of current user"
          aria-haspopup="true"
          src={user ? user?.profile_cloudinary : "img/auth/default.jpeg"}
        />
        <div>
          <Typography gutterBottom variant="h6">
            {user ? `${user?.firstName} ${user?.lastName}` : "GUEST"}
          </Typography>
          <div className={classes.bioText}>
            <img
              className={user ? classes.flag : ""}
              alt={user ? user?.country : ""}
              src={
                user
                  ? `https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${(user?.country).toLowerCase()}.svg`
                  : ""
              }
            />
            <Typography>
              {user
                ? `${countries[user?.country].name}, ${
                    countries[user?.country].continent
                  }`
                : "UNKOWN"}
            </Typography>
          </div>
        </div>
      </div>
      <Divider />
      {/* Notifications */}
      <Link to="/" className={classes.link}>
        <Home />
        <Typography className={classes.text}>Homepage</Typography>
      </Link>
      <Divider />
      <Link to="/friends" className={classes.link}>
        <Group />
        <Typography className={classes.text}>Users</Typography>
      </Link>
      <Divider />
      <Link to="/resources" className={classes.link}>
        <LibraryBooks />
        <Typography className={classes.text}>Resources</Typography>
      </Link>
      <Divider />
      {user ? (
        <React.Fragment>
          <Link to={`/profile/${user._id}`} className={classes.link}>
            <Person />
            <Typography className={classes.text}>Profile</Typography>
          </Link>
          <Divider />
          <Link to={`/settings/${user._id}`} className={classes.link}>
            <Settings />
            <Typography className={classes.text}>Settings</Typography>
          </Link>
          <Divider />
          <div
            onClick={() => logout()}
            className={classes.link}
            style={{ color: red[500] }}
          >
            <ExitToApp />
            <Typography className={classes.text}>Sign Out</Typography>
          </div>
          <Divider />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link
            to="/auth"
            className={classes.link}
            style={{ color: indigo[500] }}
          >
            <Lock />
            <Typography className={classes.text}>Sign In</Typography>
          </Link>
          <Divider />
        </React.Fragment>
      )}
    </Paper>
  );
};
