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
import { useDispatch, useSelector } from "react-redux";
import { ProfileIcons } from "./ProfileIcons";
import { fetchAllFollowers, fetchAllFollowing } from "../../api";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    position: "sticky",
    top: theme.spacing(10),
    padding: 0,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down(450)]: {
      padding: "0 1rem",
    },
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: lightGreen[500],
    color: "white",
    alignItems: "center",
    padding: "24px 0",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  },
  lgIcon: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(3),
  },
  bioText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#555",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "2rem",
    borderTop: "1px solid #ccc",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "50%",
      paddingTop: "1rem",
    },
  },
  profileInfoContainer: {
    display: "block",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      width: "100%",
    },
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
  profileText: {
    display: "flex",
    flexDirection: "column",
  },
}));
const LeftProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  //const allFollowers = useSelector((state: any) => state.allUsers);
  const [following, setFollowing] = React.useState<any>(null);
  const [followers, setFollowers] = React.useState<any>(null);

  React.useEffect(() => {
    if (user) {
      fetchAndUpdate();
    }
  }, []);
  async function fetchAndUpdate() {
    const allFollowing: any = await fetchAllFollowing();
    const allFollowers: any = await fetchAllFollowers();
    if (allFollowing.data.length > 0) {
      setFollowing(allFollowing.data);
    }
    if (allFollowers.data.length > 0) {
      setFollowers(allFollowers.data);
    }
  }
  return (
    <Container className={classes.container}>
      <Paper>
        <div className={classes.profile}>
          <div>
            <Avatar
              className={classes.lgIcon}
              alt="account_icon"
              src={user ? user?.profile_cloudinary : "img/auth/default.jpeg"}
            />
          </div>
          <div className={classes.profileText}>
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
        </div>
        {/* <Divider className={classes.divider} /> */}
        <div className={classes.profileInfoContainer}>
          <div className={classes.profileInfo}>
            <Typography gutterBottom className={classes.bioText}>
              Following
            </Typography>
            <Typography gutterBottom variant="h6">
              {user && user?.following?.length > 0 && following !== null ? (
                <ProfileIcons users={following} />
              ) : (
                0
              )}
            </Typography>
          </div>
          {/* <Divider className={classes.divider} /> */}
          <div className={classes.profileInfo}>
            <Typography gutterBottom className={classes.bioText}>
              Followers
            </Typography>
            <Typography gutterBottom variant="h6">
              {user && user?.followers?.length > 0 && followers !== null ? (
                <ProfileIcons users={followers} />
              ) : (
                0
              )}
            </Typography>
          </div>
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
