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
import { Link } from "react-router-dom";
import { followUser } from "../../actions/users";
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: 200,
    margin: theme.spacing(2),
  },
  profileCard: {
    width: 170,
    margin: theme.spacing(2),
  },
  media: {
    height: 180,
  },
  profileMedia: {
    height: 150,
  },
  btnProfile: {
    backgroundColor: lightGreen[400],
    "&:hover": {
      backgroundColor: lightGreen[300],
    },
  },
  btnContainer: {
    padding: "0 1rem 1rem 1rem",
    display: "flex",
    flexDirection: "column",
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
    <Card className={id ? classes.profileCard : classes.card}>
      <CardMedia
        className={id ? classes.profileMedia : classes.media}
        image={user?.profile_cloudinary}
      ></CardMedia>
      <CardContent>
        <Typography
          style={{ textAlign: "center" }}
          variant={id ? "body2" : "h6"}
        >
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
