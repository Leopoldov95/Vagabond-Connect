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
import { lightGreen } from "@material-ui/core/colors";

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
  const classes = useStyles();
  const user = props.user;

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={user?.profile}></CardMedia>
      <CardContent>
        <Typography style={{ textAlign: "center" }} variant="h6">
          {user?.firstName} {user?.lastName}
        </Typography>
      </CardContent>
      <div className={classes.btnContainer}>
        <Button style={{ marginBottom: 10 }} color="primary" variant="outlined">
          Follow
        </Button>
        <Button className={classes.btnProfile} variant="contained">
          View Profile
        </Button>
      </div>
    </Card>
  );
};

export default FriendCard;
