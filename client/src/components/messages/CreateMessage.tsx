import * as React from "react";
import {
  Typography,
  Theme,
  makeStyles,
  Avatar,
  InputBase,
  Button,
  Paper,
} from "@material-ui/core";
import { lightGreen, blueGrey } from "@material-ui/core/colors";
import { Send } from "@material-ui/icons";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    bottom: 10,
    position: "fixed",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "60%",
  },
  comment: {
    width: "100%",
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
  },
  btnUpdate: {
    fontSize: 12,
    margin: "0 8px",
  },
}));

const CreateMessage = () => {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const classes = useStyles();
  const [message, setMessage] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <Paper className={classes.container}>
      <Avatar
        alt="Comment_Avatar"
        src={user.profile_cloudinary}
        style={{ marginRight: 10 }}
      />
      <InputBase
        placeholder="Write your Message..."
        multiline
        inputProps={{ maxLength: 400 }}
        value={message}
        className={classes.comment}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        disabled={message.length < 1}
        className={classes.submit}
        //onClick={handleSubmit}
      >
        <Send />
      </Button>
    </Paper>
  );
};

export default CreateMessage;
