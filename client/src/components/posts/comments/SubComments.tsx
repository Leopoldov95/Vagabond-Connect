//// COMMENTS MUST DISPLAY NAME!
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Theme,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { MoreHoriz, Edit, Delete } from "@material-ui/icons";
import { deleteComment } from "../../../actions/posts";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    padding: "0 1rem 1rem 1rem",
  },
  comment: {
    backgroundColor: blueGrey[50],
    borderRadius: 16,
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  avatar: {
    marginRight: 10,
  },
}));

const SubComments = ({ comment, postId, setEditComment, setCommentId }) => {
  // use props.commentOwnerId to fetch user profile
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const userCommentInfo = useSelector((state: any) => state.commentUser);
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
    dispatch(deleteComment(postId, comment._id));
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleEdit = () => {
    setCommentId(comment._id);
    setEditComment(comment.message);
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="Comments Menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleEdit}>
        <Edit style={{ marginRight: 8 }} />
        Edit
      </MenuItem>
      <MenuItem style={{ color: "red" }} onClick={handleDelete}>
        <Delete style={{ marginRight: 8 }} />
        Delete
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.container}>
      <Avatar
        alt="comment_icon"
        src={userCommentInfo.get(comment.commentOwnerId)?.profile_cloudinary}
        className={classes.avatar}
      />
      <div className={classes.comment}>
        <Typography style={{ fontWeight: 700 }}>
          {userCommentInfo.get(comment.commentOwnerId)?.firstName}{" "}
          {userCommentInfo.get(comment.commentOwnerId)?.lastName}
        </Typography>

        <Typography align="left">{comment.message}</Typography>
      </div>

      {user && user._id === comment.commentOwnerId ? (
        <React.Fragment>
          <IconButton onClick={handleProfileMenuOpen}>
            <MoreHoriz />
          </IconButton>
          {renderMenu}
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default SubComments;
