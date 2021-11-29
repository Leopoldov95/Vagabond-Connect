import * as React from "react";
import countries from "../country/countries";
import {
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  FavoriteBorder,
  Comment,
  Room,
  MoreVert,
  Edit,
  Delete,
} from "@material-ui/icons";

import Comments from "./Comments";
import SubComments from "./SubComments";
import { findOne } from "../../testData/helper";
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
    textAlign: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  buttonText: {
    fontSize: 12,
    marginLeft: theme.spacing(1),
  },
  postOwner: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  mapText: {
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    color: "#888",
    justifyContent: "center",
  },
  country: {
    display: "flex",
    justifyContent: "center",
  },
}));
// MAKE SURE TO HAVE POST CREATOR ID
// POST.ownerId === user._id
const Post = (props: any) => {
  /* make sure to create a state to manage likes  */
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = props.post;
  const creator = findOne(post.owner);
  const classes = useStyles();
  const menuId = "post-settings";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [showComments, setShowComments] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Edit className={classes.icon} />
        Edit
      </MenuItem>
      <MenuItem style={{ color: "red" }} onClick={handleMenuClose}>
        <Delete className={classes.icon} />
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <Card className={classes.card}>
      <div className={classes.postOwner}>
        <div style={{ display: "flex" }}>
          <div>
            <Avatar
              style={{ marginRight: 10 }}
              alt="post_owner_icon"
              src={creator?.profile}
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
              {creator?.firstName} {creator?.lastName}
            </Typography>
            <Typography style={{ color: "#555", fontSize: 14 }}>
              {/*  {new Date().toLocaleString("en-US")} */} {post.created}
            </Typography>
          </div>
        </div>
        {user && user._id === post?.ownerID ? (
          <div>
            <IconButton aria-label="settings" onClick={handleProfileMenuOpen}>
              <MoreVert />
            </IconButton>
          </div>
        ) : (
          ""
        )}
      </div>
      {/*   <CardActionArea> */}
      <CardMedia className={classes.media} title="travel" image={post.image} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {post.title}
        </Typography>
        <Typography gutterBottom className={classes.country} variant="h6">
          <img
            style={{ width: 30, marginRight: 10 }}
            alt={countries[post.country].name}
            src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${countries[
              post.country
            ].code.toLowerCase()}.svg`}
          />
          {`${countries[post.country].name}, ${
            countries[post.country].continent
          }`}
        </Typography>
        <Typography variant="body2">{post.description}</Typography>
      </CardContent>
      {/*  </CardActionArea> */}
      <Divider />
      <CardActions>
        <Button size="small" color="primary" disabled={!user}>
          <FavoriteBorder />
          <Typography className={classes.buttonText}>Like</Typography>
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => setShowComments(!showComments)}
        >
          {/* will want to show how many comments */}

          <Comment />
          <Typography className={classes.buttonText}>Comments</Typography>
        </Button>
      </CardActions>
      <Divider />
      {showComments &&
        post.comments.map((comment: any) => <SubComments comment={comment} />)}
      {user && <Comments />}

      {user && user._id === post?.ownerID ? renderMenu : ""}
    </Card>
  );
};

export default Post;
