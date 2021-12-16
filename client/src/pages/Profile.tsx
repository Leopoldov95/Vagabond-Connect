import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Grid, makeStyles, Theme } from "@material-ui/core";
import { getUserPosts } from "../actions/posts";
import { getSingleUser } from "../actions/users";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileView from "../components/profile/ProfileView";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 1280,
    margin: "auto",
    marginTop: theme.spacing(4),
  },
}));

const Profile = () => {
  // need to overhual this page, need params from url, THEN find a user (may want to use a reducer...), maybe compare current user to url params so no api call needed, from ther users we need (background, profile, country, bio, _id(to fetch their posts), both country lists)
  // will need to take privacy into consideration
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id }: any = useParams(); // retrieves user_id from url params
  React.useEffect(() => {
    if (id.length !== 24) {
      history.push("/");
    }
    // get the user here
    dispatch(getSingleUser(id));
    dispatch(getUserPosts(id));
    console.log("I was initiated");
  }, [dispatch, history, id]);
  // this will trigger the entire page to rerender
  return (
    <React.Fragment>
      <ProfileHeader />
      <ProfileBio />
      <Grid container className={classes.container}>
        <ProfileView />
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
