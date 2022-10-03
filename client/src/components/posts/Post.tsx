import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../actions/posts";
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
  Collapse,
} from "@material-ui/core";
import {
  FavoriteBorder,
  Comment,
  Favorite,
  MoreVert,
  Edit,
  Delete,
} from "@material-ui/icons";

import Comments from "./comments/Comments";
import SubComments from "./comments/SubComments";
import { likePost } from "../../actions/posts";
import { fetchUserCommentInfo } from "../../actions/users";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  media: {
    height: "400px",
    [theme.breakpoints.down("md")]: {
      height: 300,
    },
    [theme.breakpoints.down("sm")]: {
      height: 250,
    },
  },
  profileMedia: {
    height: "200px",
  },
  card: {
    marginBottom: theme.spacing(5),
    textAlign: "center",
  },
  textLg: {
    display: "block",
    [theme.breakpoints.down(450)]: {
      display: "none",
    },
  },
  textDisabled: {
    color: "gray",
    marginTop: theme.spacing(1),
  },
  textMobile: {
    display: "none",
    [theme.breakpoints.down(450)]: {
      display: "block",
    },
  },
  cardContent: {
    [theme.breakpoints.down("xs")]: {
      padding: "4px 1rem",
    },
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
    alignItems: "center",
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down(450)]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
    },
  },
  cardTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  cardHeader: {
    display: "flex",
    padding: "1rem 1rem 0 1rem",
  },
}));
// MAKE SURE TO HAVE POST CREATOR ID
const Post = (props: any) => {
  const dispatch = useDispatch();
  /* make sure to create a state to manage likes  */
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const post = props?.post;
  const userCommentInfo = useSelector((state: any) => state.commentUser);
  const postReducer = useSelector((state: any) => state.postsReducer); // need this to update changes when posts change
  const classes = useStyles();
  const menuId = "post-settings";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [showComments, setShowComments] = React.useState(false);
  const [editComment, setEditComment] = React.useState(null);
  const [commentId, setCommentId] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const isMenuOpen = Boolean(anchorEl);
  // not sure it this is the best approach, diapstaching on parent level component so child doesn't have render/fetching issues
  // this method will render ALL comments profile pictures even when not in view...
  React.useEffect(() => {
    if (post.comments.length > 0) {
      // to avoid complicated rendering issue, we will already get the logged in users information, so when they create a comment, it won't have rendering issues
      if (user) {
        dispatch(fetchUserCommentInfo(user._id));
      }

      for (let comment of post.comments) {
        if (userCommentInfo.size > 0) {
          if (userCommentInfo.has(`${comment.commentOwnerId}`)) {
          } else {
            // we will dispatch here
            dispatch(fetchUserCommentInfo(comment.commentOwnerId));
          }
        } else {
          dispatch(fetchUserCommentInfo(comment.commentOwnerId));
        }
      }
    }
  }, [dispatch, postReducer]);
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
  const handleDelete = () => {
    dispatch(deletePost(post._id));
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleEdit = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    props.setEditPostId(post._id);
    props.setOpen(true);
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
      {user && user._id === post?.ownerId ? (
        <div>
          <MenuItem onClick={handleEdit}>
            <Edit className={classes.icon} />
            Edit
          </MenuItem>
          <MenuItem style={{ color: "red" }} onClick={handleDelete}>
            <Delete className={classes.icon} />
            Delete
          </MenuItem>
        </div>
      ) : (
        <MenuItem>
          <Link to={`profile/${post.ownerId}`}>View Profile</Link>
        </MenuItem>
      )}
    </Menu>
  );

  const renderComments = () => {
    const { commentAccess, ownerId } = post;
    if (user) {
      if (commentAccess === "Nobody") {
        return (
          <Typography className={classes.textDisabled}>
            New Comments Disabled
          </Typography>
        );
      } else if (commentAccess === "Followers") {
        // post contains onerId of creato
        // we can compare logged in user and check if they have the post owner ID in theor follower array
        if (user.following.includes(ownerId) || user?._id === post.ownerId) {
          return (
            <Comments
              editComment={editComment}
              setEditComment={setEditComment}
              postId={post._id}
              commentId={commentId}
              setCommentId={setCommentId}
            />
          );
        } else {
          return (
            <Typography className={classes.textDisabled}>
              Only Followers Can Comment
            </Typography>
          );
        }
      } else {
        return (
          <Comments
            editComment={editComment}
            setEditComment={setEditComment}
            postId={post._id}
            commentId={commentId}
            setCommentId={setCommentId}
          />
        );
      }
    }
  };
  return (
    <Card className={classes.card}>
      <div className={classes.postOwner}>
        <div className={classes.cardHeader}>
          <div>
            <Avatar
              style={{ marginRight: 10 }}
              alt="post_owner_avatar"
              src={post?.ownerAvatar}
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
              {post.ownerName}
            </Typography>
            <Typography style={{ color: "#555", fontSize: 14 }}>
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </div>
        </div>

        <div>
          <IconButton aria-label="settings" onClick={handleProfileMenuOpen}>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={props.isProfile ? classes.profileMedia : classes.media}
        title="travel"
        image={post.cloudinary_url}
      />
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardTitle} gutterBottom variant="h5">
          {post.title}
        </Typography>
        <Typography gutterBottom className={classes.country} variant="h6">
          <img
            style={{ width: 30, marginRight: 10 }}
            alt={post.country}
            src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${post.country.toLowerCase()}.svg`}
          />
          {`${countries[post.country].name}, ${
            countries[post.country].continent
          }`}
        </Typography>
        <div className={classes.textLg}>
          <Typography variant="body2">{post.description}</Typography>
        </div>
        <div className={classes.textMobile}>
          {post.description && post.description.length < 200 ? (
            <Typography variant="body2">{post.description}</Typography>
          ) : (
            <React.Fragment>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body2">{post.description}</Typography>
              </Collapse>
              <Button
                variant="outlined"
                color={!expanded ? "primary" : "default"}
                size="small"
                onClick={handleExpandClick}
                style={{ margin: "10px 0" }}
              >
                {!expanded ? "Read More" : "Hide"}
              </Button>
            </React.Fragment>
          )}
        </div>
      </CardContent>
      {/*  </CardActionArea> */}
      <Divider />
      <CardActions>
        <Button
          size="small"
          color="primary"
          disabled={!user}
          onClick={() => dispatch(likePost(post._id))}
        >
          {post.likes.includes(user?._id) ? <Favorite /> : <FavoriteBorder />}
          {post.likes.length > 0 ? (
            <Typography className={classes.buttonText}>
              {post.likes.length}
            </Typography>
          ) : (
            <Typography className={classes.buttonText}>Like</Typography>
          )}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => setShowComments(!showComments)}
        >
          {/* will want to show how many comments */}
          <Comment />
          <Typography
            className={classes.buttonText}
          >{`${post.comments.length} Comments`}</Typography>
        </Button>
      </CardActions>
      <Divider />
      {showComments &&
        post.comments.map((comment: any) => (
          <SubComments
            key={comment?._id}
            comment={comment}
            postId={post._id}
            setEditComment={setEditComment}
            setCommentId={setCommentId}
          />
        ))}
      {/* {user && (
        <Comments
          editComment={editComment}
          setEditComment={setEditComment}
          postId={post._id}
          commentId={commentId}
          setCommentId={setCommentId}
        />
      )} */}
      {renderComments()}
      {renderMenu}
    </Card>
  );
};

export default Post;
