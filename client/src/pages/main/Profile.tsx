import {
  Container,
  Grid,
  makeStyles,
  Theme,
  Avatar,
  Button,
  Badge,
} from "@material-ui/core";
// Add an edit button for bio and avatar
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
  headerContainer: {
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
  },
  backgroundImageContainer: {
    height: 450,
    overflow: "hidden",
  },

  avatar: {
    height: theme.spacing(24),
    width: theme.spacing(24),

    border: "5px solid white",
  },
  avatarContainer: {
    position: "absolute",
    bottom: -10,
    left: "50%",
    transform: "translateX(-50%)",
  },
  input: {
    display: "none",
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <div className="Profile">
      <Grid container className={classes.container}>
        <Container className={classes.headerContainer}>
          <div className={classes.backgroundImageContainer}>
            <img
              src="/img/profile/default.jpg"
              alt="background_profile"
              className={classes.backgroundImage}
            />
            {/*  <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label> */}
          </div>
          <div className={classes.avatarContainer}>
            <Badge badgeContent={4} color="secondary">
              <Avatar
                alt="profile_pic"
                className={classes.avatar}
                src="https://melmagazine.com/wp-content/uploads/2021/01/66f-1.jpg"
              />
            </Badge>
          </div>
        </Container>
      </Grid>
    </div>
  );
};
export default Profile;
