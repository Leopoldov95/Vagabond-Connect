import {
  Container,
  Grid,
  makeStyles,
  Theme,
  Avatar,
  Button,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { Edit, CameraAlt } from "@material-ui/icons";
// Add an edit button for bio and avatar
// for the background image, if we want to make it dynamic, have to to changes the css jsx
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
  badge: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
  },
  backgroundButton: {
    backgroundColor: lightGreen[600],
    color: "white",
    "&:hover": {
      backgroundColor: lightGreen[400],
    },
  },
  backgroundImageContainer: {
    height: 450,
    overflow: "hidden",
    background: "url(/img/profile/default.jpg) no-repeat center/cover",
  },
  backgroundInputContainer: {
    display: "flex",
    height: "98%",
    alignItems: "end",
    flexDirection: "row-reverse",
    paddingRight: "1rem",
  },
  avatar: {
    height: theme.spacing(24),
    width: theme.spacing(24),

    border: "5px solid white",
  },
  avatarButton: {
    zIndex: 10,
    borderRadius: "50%",
    height: 48,
    width: 50,
    minWidth: 0,
    position: "absolute",
    right: 0,
    bottom: 10,
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

const ProfileHeader = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.container}>
        <Container className={classes.headerContainer}>
          <div className={classes.backgroundImageContainer}>
            {/* <img
                src="/img/profile/default.jpg"
                alt="background_profile"
                className={classes.backgroundImage}
              /> */}
            <div className={classes.backgroundInputContainer}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  startIcon={<Edit />}
                  variant="contained"
                  component="span"
                  className={classes.backgroundButton}
                >
                  Edit
                </Button>
              </label>
            </div>
          </div>
          <div className={classes.avatarContainer}>
            <div>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <Button
                  className={classes.avatarButton}
                  aria-label="upload picture"
                  component="span"
                  variant="contained"
                >
                  <CameraAlt />
                </Button>
              </label>
            </div>

            <Avatar
              alt="profile_pic"
              className={classes.avatar}
              src="https://melmagazine.com/wp-content/uploads/2021/01/66f-1.jpg"
            />
          </div>
        </Container>
      </Grid>
    </div>
  );
};
export default ProfileHeader;
