import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Theme, makeStyles, Typography } from "@material-ui/core";
import MessageList from "../components/messages/MessageList";
import MessageContent from "../components/messages/MessageContent";
import { SNACKBAR_WARNING } from "../constants/actionTypes";
import { getSingleUser } from "../actions/users";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(9),
  },
}));
export const Messages = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id }: any = useParams();
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
  React.useEffect(() => {
    id && dispatch(getSingleUser(id));
  }, [id]);
  return (
    <Grid container>
      <Grid item sm={4}>
        <MessageList />
      </Grid>
      <Grid item sm={8}>
        <MessageContent />
      </Grid>
    </Grid>
  );
};

export default Messages;
