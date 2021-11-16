import {
  Container,
  Paper,
  Typography,
  Avatar,
  Theme,
  makeStyles,
} from "@material-ui/core";
import { findOne } from "../../testData/helper";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
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
const SubComments = (props: any) => {
  const classes = useStyles();
  const creator = findOne(props.comment.owner);
  console.log(creator);
  //console.log(props);
  return (
    <div className={classes.container}>
      <Avatar
        alt="comment_icon"
        src={creator?.profile}
        className={classes.avatar}
      />
      <div className={classes.comment}>
        <Typography style={{ fontWeight: 500 }}>
          {creator?.firstName} {creator?.lastName}
        </Typography>
        <Typography>{props.comment.message}</Typography>
      </div>
    </div>
  );
};

export default SubComments;
