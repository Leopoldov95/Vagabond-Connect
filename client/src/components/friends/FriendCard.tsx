import * as React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Theme,
  CardContent,
  CardActionArea,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { lightGreen } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import { followUser } from "../../actions/users";
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: 200,
    margin: theme.spacing(2),
  },
  media: {
    height: 180,
  },
  btnProfile: {
    backgroundColor: lightGreen[400],
    "&:hover": {
      backgroundColor: lightGreen[300],
    },
  },
  btnContainer: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
}));
const FriendCard = (props: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = props.user;
  const userReducer = useSelector((state: any) => state.userAuthReducer);
  const [tempDisabled, setTempDisabled] = React.useState(false);
  const [authUser, setAuthUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );
  //const authUser = JSON.parse(localStorage.getItem("profile"))?.result;
  React.useEffect(() => {
    setAuthUser(JSON.parse(localStorage.getItem("profile"))?.result);
    setTempDisabled(false);
  }, [userReducer]);
  const handleFollow = () => {
    // console.log(user._id);
    setTempDisabled(true);
    dispatch(followUser(user._id));
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={user?.profile_cloudinary}
      ></CardMedia>
      <CardContent>
        <Typography style={{ textAlign: "center" }} variant="h6">
          {user?.firstName} {user?.lastName}
        </Typography>
      </CardContent>
      <div className={classes.btnContainer}>
        {authUser && authUser.following.includes(user._id) ? (
          <Button
            style={{ marginBottom: 10 }}
            color="secondary"
            variant="outlined"
            onClick={handleFollow}
            disabled={!authUser || authUser._id === user._id || tempDisabled}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            style={{ marginBottom: 10 }}
            color="primary"
            variant="outlined"
            onClick={handleFollow}
            disabled={!authUser || authUser._id === user._id || tempDisabled}
          >
            Follow
          </Button>
        )}

        <Button className={classes.btnProfile} variant="contained">
          <Link to={`/profile/${user._id}`}>View Profile</Link>
        </Button>
      </div>
    </Card>
  );
};

export default FriendCard;
