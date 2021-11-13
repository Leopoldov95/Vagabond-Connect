import * as React from "react";
import {
  Avatar,
  InputBase,
  Theme,
  makeStyles,
  Button,
} from "@material-ui/core";

import { blueGrey, lightGreen } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  writeComment: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
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
}));
const Comments = () => {
  const [comment, setComment] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const classes = useStyles();
  return (
    <div className={classes.writeComment}>
      <Avatar
        alt="post_owner_icon"
        src="https://melmagazine.com/wp-content/uploads/2021/01/66f-1.jpg"
        style={{ marginRight: 10 }}
      />
      <InputBase
        placeholder="Write your comment..."
        multiline
        className={classes.comment}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        disabled={comment.length < 1}
        className={classes.submit}
      >
        Post
      </Button>
    </div>
  );
};

export default Comments;
