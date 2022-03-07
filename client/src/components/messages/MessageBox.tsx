import { Typography, Theme, makeStyles, Avatar } from "@material-ui/core";
import { lightGreen, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    color: "white",
  },
  userContainer: {
    backgroundColor: blue[500],
  },
  targetContainer: {
    backgroundColor: lightGreen[500],
  },

  comment: {
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
const MessageBox = ({ createdAt, message, messageOwner, isUser }) => {
  console.log(createdAt, message, messageOwner);
  const classes = useStyles();
  return (
    <div
      className={`${classes.container} ${
        isUser ? classes.userContainer : classes.targetContainer
      }`}
    >
      <div className={classes.comment}>
        <Typography>{message}</Typography>
      </div>
    </div>
  );
};

export default MessageBox;
