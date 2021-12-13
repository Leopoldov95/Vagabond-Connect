import * as React from "react";
import {
  Container,
  makeStyles,
  Theme,
  Avatar,
  Typography,
  Divider,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { lightGreen } from "@material-ui/core/colors";
import countries from "../country/countries";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    position: "sticky",
    top: theme.spacing(10),
    padding: 0,
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: lightGreen[500],
    color: "white",
    alignItems: "center",
    padding: "24px 0",
    justifyContent: "center",
  },
  lgIcon: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(3),
  },
  bioText: {
    display: "flex",
    alignItems: "center",
    color: "#555",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileImg: {
    width: 20,
    marginRight: 10,
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  link: {
    paddingBottom: theme.spacing(3),
  },
  routerLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));
const LeftProfile = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  return (
    <Container className={classes.container}>
      <Paper>
        <div className={classes.profile}>
          <Avatar
            className={classes.lgIcon}
            alt="account_icon"
            src={user ? user?.profile_cloudinary : "img/auth/default.jpeg"}
          />
          <Typography gutterBottom variant="h6">
            {user ? `${user?.firstName} ${user?.lastName}` : "GUEST"}
          </Typography>
          <Typography gutterBottom className={classes.bioText}>
            <img
              className={user ? classes.profileImg : ""}
              alt={user ? user?.country : ""}
              src={
                user
                  ? `https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${(user?.country).toLowerCase()}.svg`
                  : ""
              }
            />
            {user
              ? `${countries[user?.country].name}, ${
                  countries[user?.country].continent
                }`
              : "UNKOWN"}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.profileInfo}>
          <Typography gutterBottom className={classes.bioText}>
            Following
          </Typography>
          <Typography gutterBottom variant="h6">
            {user ? user?.following?.length : 0}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.profileInfo}>
          <Typography gutterBottom className={classes.bioText}>
            Followers
          </Typography>
          <Typography gutterBottom variant="h6">
            {user ? user?.followers?.length : 0}
          </Typography>
        </div>

        {user && (
          <React.Fragment>
            <Divider className={classes.divider} />
            <div className={classes.link}>
              <Link
                to={`/profile/${user?._id}`}
                className={classes.routerLink}
                style={{ color: lightGreen[800] }}
              >
                View Profile
              </Link>
            </div>
          </React.Fragment>
        )}
      </Paper>
    </Container>
  );
};

export default LeftProfile;
