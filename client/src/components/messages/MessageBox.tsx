import { Typography, Theme, makeStyles, Avatar } from "@material-ui/core";
import { lightGreen, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    color: "white",
  },
  targetContainer: {
    justifyContent: "right",
    flexDirection: "row-reverse",
  },

  comment: {
    borderRadius: 18,
    padding: theme.spacing(2),
    display: "inline-block",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  avatar: {
    margin: "0 10px",
  },
}));
const MessageBox = ({ createdAt, message, messageOwner, isUser, avatar }) => {
  const classes = useStyles();
  return (
    <div
      className={`${classes.container} ${isUser && classes.targetContainer}`}
    >
      <Avatar src={avatar} className={classes.avatar} />
      <div
        className={classes.comment}
        style={{ backgroundColor: isUser ? blue[500] : lightGreen[500] }}
      >
        <Typography>
          <strong>
            {new Date(createdAt).toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </strong>
        </Typography>
        <Typography>{message}</Typography>
      </div>
    </div>
  );
};

export default MessageBox;
