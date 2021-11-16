import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileBio from "../../components/profile/ProfileBio";
import ProfileCountries from "../../components/profile/ProfileCountries";
import Feed from "../../components/posts/Feed";
import { Grid, makeStyles, Theme } from "@material-ui/core";
import DUMMY_POSTS from "../../testData/posts";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 1280,
    margin: "auto",
    marginTop: theme.spacing(4),
  },
}));

const Profile = (props: any) => {
  const classes = useStyles();
  return (
    <div>
      <ProfileHeader />
      <ProfileBio />
      <Grid container className={classes.container}>
        <Grid item sm={4} xs={2}>
          <ProfileCountries />
        </Grid>
        <Grid item sm={8} xs={10}>
          <Feed posts={props.posts} />
        </Grid>
      </Grid>
    </div>
  );
};

export async function getStaticProps() {
  // fetch data from an API

  // ALWAYS NEED TO RETURN AN {}
  return {
    props: {
      posts: DUMMY_POSTS,
    },
  };
}
export default Profile;
