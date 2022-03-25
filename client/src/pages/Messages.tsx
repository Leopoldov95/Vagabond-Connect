import * as React from "react";
import { io } from "socket.io-client";
import { baseURL } from "../api/index";
import { useDispatch } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { Grid, Theme, makeStyles, Typography } from "@material-ui/core";
import MessageList from "../components/messages/MessageList";
import MessageContent from "../components/messages/MessageContent";
import { SNACKBAR_WARNING } from "../constants/actionTypes";
import { getSingleUser } from "../actions/users";
import { fetchMessageThread, fetchAllContacts } from "../actions/message";

let socket, selectedChatCompare;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(9),
  },
}));
export const Messages = () => {
  //const socket: any = React.useRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { id }: any = useParams();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [targetId, setTargetId] = React.useState(null);
  const [socketConnected, setSocketConnected] = React.useState(false);
  // throws a warning that the user must be logged in in order to view the messages
  // only makes a connection to socket.io if there is an active user
  // React.useEffect(() => {
  //   if (user) {
  //     socket = io(baseURL);
  //     socket.emit("setup", user._id);
  //     socket.on("connected", () => {
  //       setSocketConnected(true);
  //     });
  //     // socket.current.emit("add-user", user._id);
  //   }
  // }, [user]);
  React.useEffect(() => {
    if (!user) {
      history.push("/auth");
      dispatch({
        type: SNACKBAR_WARNING,
        payload: "You Must Have An Account To View Messages",
      });
    } else {
      dispatch(fetchAllContacts());
    }
  }, []);
  React.useEffect(() => {
    if (targetId !== null) {
      socket = io(baseURL);
      socket.emit("setup", targetId);
      socket.on("connected", () => {
        setSocketConnected(true);
      });
    }
  }, [user]);
  React.useEffect(() => {
    console.log(`There is an active id which is ${id}`);
    id && dispatch(getSingleUser(id)); // this may be redunsnat as I am already brabbing a minified user list onn page load
    // this will fetch the message thread for the individual
    // double authentication
    user && id && dispatch(fetchMessageThread(id));
  }, [id, location]);
  // React.useEffect(() => {
  //   if (selectedUser) {
  //     Object.keys(selectedUser).length > 0 &&
  //       dispatch(fetchMessageThread(selectedUser._id));
  //   }
  //   // Now that we have established the sleected user, we can now do the message thread call here
  // }, [selectedUser]);
  console.log(selectedUser);
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
          selectedChatCompare={selectedChatCompare}
          setTargetId={setTargetId}
        />
      </Grid>
    </Grid>
  );
};

export default Messages;
