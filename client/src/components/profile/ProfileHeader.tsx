import * as React from "react";
import { useSelector } from "react-redux";
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
import ProfileImgHandler from "./ProfileImgHandler";

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
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );
  // This code serves to update the page in real time
  const API_USER = useSelector((state: any) => state.userAuthReducer)?.authData
    ?.result;
  React.useEffect(() => {
    if (API_USER) {
      setUser(API_USER);
    }
  }, [API_USER]);

  const [profileDb, setProfileDb] = React.useState<any>({
    url: "",
    profile: "",
  });
  const [openHandler, setOpenHandler] = React.useState(false);
  // this will open the IMG tool, the data we pass will correspond to what the current image is as well as the profile so we know which image tp mpdify on the server
  const openImgTool = (url, profile) => {
    setProfileDb({
      url: url,
      profile: profile,
    });
    setOpenHandler(true);
  };
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.container}>
        <Container className={classes.headerContainer}>
          <div
            className={classes.backgroundImageContainer}
            style={{
              background: `url(${
                user ? user?.background_cloudinary : "/img/profile/default.jpg"
              }) no-repeat center/cover`,
            }}
          >
            <div className={classes.backgroundInputContainer}>
              <Button
                startIcon={<Edit />}
                variant="contained"
                component="span"
                className={classes.backgroundButton}
                onClick={() =>
                  openImgTool(
                    user?.background_cloudinary
                      ? user?.background_cloudinary
                      : "/img/profile/default.jpg",
                    "background_cloudinary"
                  )
                }
              >
                Edit
              </Button>
            </div>
          </div>
          <div className={classes.avatarContainer}>
            {/*        <div> */}
            {/*  <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file"> */}
            <Button
              className={classes.avatarButton}
              aria-label="upload picture"
              component="span"
              variant="contained"
              onClick={() =>
                openImgTool(
                  user?.profile_cloudinary
                    ? user?.profile_cloudinary
                    : "/img/profile/default.jpg",
                  "profile_cloudinary"
                )
              }
            >
              <CameraAlt />
            </Button>
            {/* </label> */}
            {/*    </div> */}

            <Avatar
              alt="profile_pic"
              className={classes.avatar}
              src={user?.profile_cloudinary}
            />
          </div>
        </Container>
      </Grid>
      <ProfileImgHandler
        open={openHandler}
        setOpen={setOpenHandler}
        profile={profileDb}
      />
    </div>
  );
};
export default ProfileHeader;
