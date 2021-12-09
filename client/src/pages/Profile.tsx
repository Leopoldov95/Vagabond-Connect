import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileCountries from "../components/profile/ProfileCountries";
import Feed from "../components/posts/Feed";
import { Grid, makeStyles, Theme } from "@material-ui/core";
import { getUserPosts } from "../actions/posts";
import { getSingleUser } from "../actions/users";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 1280,
    margin: "auto",
    marginTop: theme.spacing(4),
  },
}));

// Only allow someone to view this page if a user is looged in, else we want to redirect to auth page
// DO NOT NEED TO CREATE ADD COMPNENT FOR OTHER USERS, ONLY LOGGED IN USER
const Profile = () => {
  // need to overhual this page, need params from url, THEN find a user (may want to use a reducer...), maybe compare current user to url params so no api call needed, from ther users we need (background, profile, country, bio, _id(to fetch their posts), both country lists)
  // will need to take privacy into consideration
  const history = useHistory();
  const dispatch = useDispatch();
  const { id }: any = useParams(); // retrieves user_id from url params
  //const userProfile = useSelector((state: any) => state.singleUser);
  //const user = JSON.parse(localStorage.getItem("profile"))?.result;
  React.useEffect(() => {
    if (id.length !== 24) {
      history.push("/");
    }
    // get the user here
    dispatch(getSingleUser(id));
    dispatch(getUserPosts(id));
  }, [dispatch]);

  /*   React.useEffect(() => {
    dispatch(getUserPosts(id));
  }, []); */
  const classes = useStyles();
  //console.log("pofile page");

  return (
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
  );
};

export default Profile;
