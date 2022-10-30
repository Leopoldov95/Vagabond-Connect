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
  date: {
    fontSize: 12,
  },
  message: {
    borderRadius: 14,
    padding: "0.25rem 0.5rem",
    display: "inline-block",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  avatar: {
    margin: "0 10px",
  },
  text: {
    fontSize: 14,
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
        className={classes.message}
        style={{ backgroundColor: isUser ? blue[500] : lightGreen[500] }}
      >
        <Typography className={classes.date}>
          <strong>
            {new Date(createdAt).toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </strong>
        </Typography>
        <Typography className={classes.text}>{message}</Typography>
      </div>
    </div>
  );
};

export default MessageBox;
