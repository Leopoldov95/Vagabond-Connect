import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Theme, makeStyles, Typography } from "@material-ui/core";
import MessageList from "../components/messages/MessageList";
import MessageContent from "../components/messages/MessageContent";
import { SNACKBAR_WARNING } from "../constants/actionTypes";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 1280,
    margin: "auto",
    marginTop: theme.spacing(10),
  },
}));
export const Messages = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  React.useEffect(() => {
    if (!user) {
      history.push("/auth");
      dispatch({
        type: SNACKBAR_WARNING,
        payload: "You Must Have An Account To View Messages",
      });
    }
  }, []);
  return (
    <Grid container className={classes.container}>
      <Grid item sm={3}>
        <MessageList />
      </Grid>
      <Grid item sm={9}>
        <MessageContent />
      </Grid>
    </Grid>
  );
};

export default Messages;
