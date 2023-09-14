import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  InputBase,
  Theme,
  makeStyles,
  Button,
} from "@material-ui/core";

import { blueGrey, lightGreen } from "@material-ui/core/colors";
import {
  createComment,
  editComment as editUserComment,
} from "../../../actions/posts";
const useStyles = makeStyles((theme: Theme) => ({
  writeComment: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    padding: "0 1rem 1rem 1rem",
  },
  comment: {
    width: "70%",
    backgroundColor: blueGrey[50],
    padding: "10px 1.4rem",
    borderRadius: 16,
  },

  submit: {
    color: "white",
    marginLeft: theme.spacing(2),
    backgroundColor: lightGreen[600],
    "&:hover": {
      backgroundColor: lightGreen[400],
    },
  },
  btnContainer: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  btnUpdate: {
    fontSize: 12,
    margin: "0 8px",
  },
}));
const Comments = ({
  postId,
  editComment,
  setEditComment,
  commentId,
  setCommentId,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const [comment, setComment] = useState("");
  React.useEffect(() => {
    if (editComment) {
      setComment(editComment);
    }
  }, [editComment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditComment(null);
    setComment("");
  };
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // dispatch(editComment(comment, postId, commentId));
    dispatch(editUserComment(comment, postId, commentId));
    setEditComment(null);
    setComment("");
  };
  const handleSubmit = (e?: any) => {
    e.preventDefault();
    dispatch(createComment(postId, comment));
    setComment("");
  };

  return (
    <div className={classes.writeComment}>
      <Avatar
        alt="Comment_Avatar"
        src={user.profile_cloudinary}
        style={{ marginRight: 10 }}
      />
      <InputBase
        placeholder="Write your comment..."
        multiline
        value={comment}
        className={classes.comment}
        onChange={handleChange}
      />
      {editComment ? (
        <div className={classes.btnContainer}>
          <Button
            size="small"
            variant="outlined"
            disabled={comment.length < 3}
            color="primary"
            onClick={handleEdit}
            className={classes.btnUpdate}
          >
            Update
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            style={{ marginTop: "4px" }}
            className={classes.btnUpdate}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          size="small"
          variant="contained"
          disabled={comment.length < 3}
          className={classes.submit}
          onClick={handleSubmit}
        >
          Post
        </Button>
      )}
    </div>
  );
};

export default Comments;
