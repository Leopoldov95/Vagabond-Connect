import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Theme, makeStyles, Typography } from "@material-ui/core";
import MessageList from "../components/messages/MessageList";
import MessageContent from "../components/messages/MessageContent";
import { SNACKBAR_WARNING } from "../constants/actionTypes";
import { getSingleUser } from "../actions/users";
import { fetchMessageThread } from "../actions/message";
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
  const [selectedUser, setSelectedUser] = React.useState(null);
  // throws a warning that the user must be logged in in order to view the messages
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
    // this will fetch the message thread for the individual
    // double authentication
    user && id && dispatch(fetchMessageThread(id));
  }, [id]);
  // React.useEffect(() => {
  //   if (selectedUser) {
  //     Object.keys(selectedUser).length > 0 &&
  //       dispatch(fetchMessageThread(selectedUser._id));
  //   }
  //   // Now that we have established the sleected user, we can now do the message thread call here
  // }, [selectedUser]);
  console.log("I should only be called once");
  return (
    <Grid container>
      <Grid item sm={4}>
        <MessageList
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </Grid>
      <Grid item sm={8}>
        <MessageContent
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </Grid>
    </Grid>
  );
};

export default Messages;
