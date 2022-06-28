import * as React from "react";
import { useParams } from "react-router";
import {
  Card,
  CardMedia,
  Typography,
  Theme,
  CardContent,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { lightGreen } from "@material-ui/core/colors";
import { Visibility, PersonAdd, PersonAddDisabled } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { followUser } from "../../actions/users";
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: 200,
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: 180,
      margin: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100px",
    },
  },
  btnLg: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  btnSm: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  profileCard: {
    width: 170,
    margin: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      margin: "8px 1rem 8px 0px",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100px",
    },
  },
  media: {
    height: 180,
    [theme.breakpoints.down("sm")]: {
      height: 160,
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%",
      width: "90px",
    },
  },
  profileMedia: {
    height: 150,
    [theme.breakpoints.down("xs")]: {
      height: "100%",
      width: "90px",
    },
  },
  btnMobile: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "48px",
      minWidth: 0,
    },
  },
  btnProfile: {
    backgroundColor: lightGreen[400],
    width: "100%",
    "&:hover": {
      backgroundColor: lightGreen[300],
    },
    [theme.breakpoints.down("xs")]: {
      width: "48px",
      minWidth: 0,
    },
  },
  btnContainer: {
    padding: "0 1rem 1rem 1rem",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      padding: "0 1rem 0 0",
    },
  },
  cardName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  mobileIcon: {
    [theme.breakpoints.down("xs")]: {
      marginRight: "-8px",
    },
  },
}));
const FriendCard = (props: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const params = useParams();
  const { id }: any = params; // Need this to determin if viewing friends on Friends Page OR from Profile
  const user = props.user;
  const userReducer = useSelector((state: any) => state.userAuthReducer);
  const [tempDisabled, setTempDisabled] = React.useState(false);
  const [authUser, setAuthUser] = React.useState(
    JSON.parse(localStorage.getItem("vagabond_connect_profile"))?.result
  );
  //const authUser = JSON.parse(localStorage.getItem("profile"))?.result;
  React.useEffect(() => {
    setAuthUser(
      JSON.parse(localStorage.getItem("vagabond_connect_profile"))?.result
    );
    setTempDisabled(false);
  }, [userReducer]);
  const handleFollow = () => {
    setTempDisabled(true);
    dispatch(followUser(user._id));
  };
  return (
    <Card className={id ? classes.profileCard : classes.card}>
      <CardMedia
        className={id ? classes.profileMedia : classes.media}
        image={user?.profile_cloudinary}
      ></CardMedia>
      <CardContent>
        <Typography
          className={classes.cardName}
          style={{ textAlign: "center" }}
          variant={id ? "body2" : "h6"}
        >
          {user?.firstName} {user?.lastName}
        </Typography>
      </CardContent>
      <div className={classes.btnContainer}>
        {authUser && authUser.following.includes(user._id) ? (
          <React.Fragment>
            <div className={classes.btnLg}>
              <Button
                style={{ marginBottom: 10 }}
                className={classes.btnMobile}
                color="secondary"
                variant="outlined"
                onClick={handleFollow}
                disabled={
                  !authUser || authUser._id === user._id || tempDisabled
                }
              >
                Unfollow
              </Button>
            </div>
            <div className={classes.btnSm}>
              <Button
                style={{ marginBottom: 10 }}
                className={classes.btnMobile}
                color="secondary"
                variant="outlined"
                onClick={handleFollow}
                disabled={
                  !authUser || authUser._id === user._id || tempDisabled
                }
                startIcon={<PersonAddDisabled />}
              ></Button>
            </div>
          </React.Fragment>
        ) : (
          // change the buttons to icons on mobile views
          <React.Fragment>
            <div className={classes.btnLg}>
              <Button
                style={{ marginBottom: 10 }}
                className={classes.btnMobile}
                color="primary"
                variant="outlined"
                onClick={handleFollow}
                disabled={
                  !authUser || authUser._id === user._id || tempDisabled
                }
              >
                Follow
              </Button>
            </div>
            <div className={classes.btnSm}>
              <Button
                style={{ marginBottom: 10 }}
                className={classes.btnMobile}
                color="primary"
                variant="outlined"
                onClick={handleFollow}
                disabled={
                  !authUser || authUser._id === user._id || tempDisabled
                }
                startIcon={<PersonAdd className={classes.mobileIcon} />}
              ></Button>
            </div>
          </React.Fragment>
        )}
        <React.Fragment>
          <div className={classes.btnLg}>
            <Button className={classes.btnProfile} variant="contained">
              <Link to={`/profile/${user._id}`}>View Profile</Link>
            </Button>
          </div>
          <div className={classes.btnSm}>
            <Link to={`/profile/${user._id}`}>
              <Button
                className={classes.btnProfile}
                variant="contained"
                startIcon={<Visibility className={classes.mobileIcon} />}
              ></Button>
            </Link>
          </div>
        </React.Fragment>
      </div>
    </Card>
  );
};

export default FriendCard;
