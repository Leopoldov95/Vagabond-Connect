import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  Avatar,
  TextField,
} from "@material-ui/core";
import { Favorite, FavoriteBorder, Comment } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  media: {
    height: "250px",
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
  card: {
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2),
  },
  buttonText: {
    fontSize: 12,
    marginLeft: theme.spacing(1),
  },
  postOwner: {
    marginBottom: theme.spacing(1),
    display: "flex",
  },
  writeComment: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  comment: {
    width: "70%",
  },
}));
const Post = () => {
  /* make sure to create a state to manage likes  */
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.postOwner}>
        <div>
          <Avatar
            style={{ marginRight: 10 }}
            alt="post_owner_icon"
            src="https://images-cdn.9gag.com/photo/aK7r78Q_700b.jpg"
          />
        </div>
        <div>
          <Typography
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "left",
            }}
          >
            The Wok
          </Typography>
          <Typography style={{ color: "#555", fontSize: 14 }}>
            {new Date().toLocaleString("en-US")}
          </Typography>
        </div>
      </div>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title="travel"
          image="https://images.unsplash.com/photo-1462759353907-b2ea5ebd72e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2831&q=80"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            New Zealand Hobbiton
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
            laboriosam nihil aspernatur odit quam eum nostrum laborum, nulla
            deserunt necessitatibus architecto ratione impedit consequuntur vel
            ab nesciunt minus esse vitae? Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Non laboriosam nihil aspernatur odit
            quam eum nostrum laborum, nulla deserunt necessitatibus architecto
            ratione impedit consequuntur vel ab nesciunt minus esse vitae?
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Button size="small" color="primary">
          <FavoriteBorder />
          <Typography className={classes.buttonText}>Like</Typography>
        </Button>
        <Button size="small" color="primary">
          {/* will want to show how many comments */}
          <Comment />
          <Typography className={classes.buttonText}>Comments</Typography>
        </Button>
      </CardActions>
      <Divider />
      <div className={classes.writeComment}>
        <Avatar
          alt="post_owner_icon"
          src="https://melmagazine.com/wp-content/uploads/2021/01/66f-1.jpg"
          style={{ marginRight: 10 }}
        />
        <TextField
          variant="outlined"
          label="Comment"
          placeholder="Write your comment..."
          multiline
          className={classes.comment}
          size="small"
        />
      </div>
    </Card>
  );
};

export default Post;
