import * as React from "react";
import {
  Theme,
  makeStyles,
  Avatar,
  InputBase,
  Button,
  Paper,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { lightGreen, blueGrey } from "@material-ui/core/colors";
import { Send } from "@material-ui/icons";
import { postMessage } from "../../actions/message";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    bottom: 10,
    position: "fixed",
    display: "flex",
    alignItems: "center",
    padding: "6px 1rem",
    width: "60%",
    [theme.breakpoints.down(700)]: {
      width: "76%",
    },
    [theme.breakpoints.down("xs")]: {
      left: 0,
      bottom: 0,
      width: "100%",
    },
  },
  comment: {
    width: "100%",
    backgroundColor: blueGrey[50],
    padding: "10px 1.4rem",
    borderRadius: 16,
    overflowY: "auto",
    maxHeight: theme.spacing(8),
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },

  submit: {
    color: "white",
    marginLeft: theme.spacing(2),
    backgroundColor: lightGreen[600],
    "&:hover": {
      backgroundColor: lightGreen[400],
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: 0,
      borderRadius: 30,
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

const CreateMessage = ({ selectedUser }) => {
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const classes = useStyles();
  const dispatch = useDispatch();
  const socket = useSelector((state: any) => state.socketReducer);
  const [message, setMessage] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (socket && selectedUser) {
      const data = {
        sender: user._id,
        receiver: selectedUser,
      };
      socket.emit("typing", data);
    }
    //socket.emit("typing",)
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(postMessage(selectedUser, { message }));
    setMessage("");
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
        onClick={handleSubmit}
      >
        <Send />
      </Button>
    </Paper>
  );
};

export default CreateMessage;
