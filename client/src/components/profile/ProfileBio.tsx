import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  makeStyles,
  Theme,
  CircularProgress,
  Button,
  TextField,
} from "@material-ui/core";
import { Edit, Close, MailOutline } from "@material-ui/icons";
import { followUser } from "../../actions/users";
import countries from "../country/countries";
import { lightGreen } from "@material-ui/core/colors";
import { editUserDetails } from "../../actions/users";
import Loader from "../Loader";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
    textAlign: "center",
    maxWidth: 1280,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  profileAction: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down(450)]: {
      flexDirection: "column",
      marginBottom: theme.spacing(1),
    },
  },
  btnEdit: {
    color: lightGreen[700],
    border: `1px solid ${lightGreen[700]}`,
    marginLeft: theme.spacing(1),
    "&:hover": {
      color: lightGreen[500],
      border: `1px solid ${lightGreen[500]}`,
      backgroundColor: lightGreen[50],
    },
  },
  btnMobile: {
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  profileName: {
    margin: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },
  bioText: {
    [theme.breakpoints.down("xs")]: {
      padding: "0 1rem",
    },
  },
  bioEditMobile: {
    [theme.breakpoints.down("xs")]: {
      margin: "0 1rem",
    },
  },
}));
// will want to showcase follwing and followers in group avatar, can use post id reucer to manage users profile img
// to display profile owner country info, may want to use data from MongoDB
const ProfileBio = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userReducer = useSelector((state: any) => state.userAuthReducer); // this is needed to make live changes to user profile
  const userProfile = useSelector((state: any) => state.singleUser);
  const [authUser, setAuthUser] = React.useState(
    JSON.parse(localStorage.getItem("vagabond_connect_profile"))?.result
  );
  let displayUser =
    Object.keys(userProfile).length > 0 ? userProfile : authUser;

  const [tempDisabled, setTempDisabled] = React.useState(false);
  const [bio, setBio] = React.useState(""); // will want to populate using users bio data, may want to relook into Country List complicatiob, no need to explicitly store users data into a state, can just retrieve from localStorage. may also want to reuse profile_edit route
  const [isEdit, setIsEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // need this to handle render load issue
  // creating local bio state for editing
  React.useEffect(() => {
    if (displayUser) {
      setBio(displayUser.bio);
    }
  }, [displayUser]);
  React.useEffect(() => {
    if (userReducer.authData !== null && displayUser?._id === authUser?._id) {
      displayUser = userReducer.authData.result;
      setIsEdit(false);
      setLoading(false);
    }
  }, [userReducer]);
  // This is to handle the api call for the follow btn
  React.useEffect(() => {
    setAuthUser(
      JSON.parse(localStorage.getItem("vagabond_connect_profile"))?.result
    );
    setTempDisabled(false);
  }, [userReducer]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };
  const handleFollow = () => {
    setTempDisabled(true);
    dispatch(followUser(displayUser._id));
  };
  const handleEditClick = () => {
    setIsEdit(!isEdit);
    setBio(displayUser.bio);
  };

  const handleSave = () => {
    setLoading(true);
    const { email } = authUser;
    dispatch(editUserDetails({ email, bio }));
  };
  return (
    <Grid container className={classes.container}>
      {displayUser ? (
        <React.Fragment>
          <Typography
            style={{
              margin: "auto",
              color: "#555",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: 20, marginRight: 10 }}
              alt={displayUser?.country}
              src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${displayUser?.country.toLowerCase()}.svg`}
            />
            {`${countries[displayUser?.country].name}, ${
              countries[displayUser?.country].continent
            }`}
          </Typography>
          <div className={classes.profileAction}>
            <Typography className={classes.profileName} variant="h4">
              {displayUser?.firstName} {displayUser?.lastName}
            </Typography>
            <div>
              {authUser && authUser.following.includes(displayUser._id) ? (
                <Button
                  className={classes.btnMobile}
                  color="secondary"
                  variant="outlined"
                  onClick={handleFollow}
                  disabled={
                    !authUser ||
                    authUser._id === displayUser._id ||
                    tempDisabled
                  }
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleFollow}
                  disabled={
                    !authUser ||
                    authUser._id === displayUser._id ||
                    tempDisabled
                  }
                >
                  Follow
                </Button>
              )}
              {authUser && authUser?._id !== displayUser?._id && (
                <Link to={`/messages/${displayUser._id}`}>
                  <Button variant="outlined" className={classes.btnEdit}>
                    <MailOutline />
                  </Button>
                </Link>
              )}
              {authUser && authUser?._id === displayUser?._id && (
                <Button
                  variant="outlined"
                  className={classes.btnEdit}
                  startIcon={isEdit ? <Close /> : <Edit />}
                  onClick={handleEditClick}
                >
                  {isEdit ? "Cancel" : "Edit Bio"}
                </Button>
              )}
              {authUser &&
                authUser?._id === displayUser?._id &&
                displayUser.bio !== bio &&
                isEdit && (
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ margin: "0 10px" }}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                )}
            </div>
          </div>
          {isEdit ? (
            <TextField
              multiline
              className={classes.bioEditMobile}
              label="Edit Bio"
              maxRows={4}
              value={bio}
              onChange={handleChange}
              inputProps={{ maxLength: 400 }}
            />
          ) : (
            <Typography variant="body1" className={classes.bioText}>
              {bio}
            </Typography>
          )}
        </React.Fragment>
      ) : (
        <div style={{ marginTop: "3rem" }}>
          <CircularProgress size={60} />
        </div>
      )}
      {loading && <Loader />}
    </Grid>
  );
};

export default ProfileBio;
