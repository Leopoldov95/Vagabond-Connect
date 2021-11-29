import * as React from "react";
import { useHistory } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileCountries from "../components/profile/ProfileCountries";
import Feed from "../components/posts/Feed";
import { Grid, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 1280,
    margin: "auto",
    marginTop: theme.spacing(4),
  },
}));

// Only allow someone to view this page if a user is looged in, else we want to redirect to auth page
const Profile = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  React.useEffect(() => {
    if (!user) {
      history.push("/auth");
    }
  }, []);
  const classes = useStyles();
  return user ? (
    <div>
      <ProfileHeader />
      <ProfileBio />
      <Grid container className={classes.container}>
        <Grid item sm={4} xs={2}>
          <ProfileCountries />
        </Grid>
        <Grid item sm={8} xs={10}>
          <Feed />
        </Grid>
      </Grid>
    </div>
  ) : (
    <div>
      <Typography>
        Please Create an Account to See the Profile Page...
      </Typography>
    </div>
  );
};
export default Profile;
