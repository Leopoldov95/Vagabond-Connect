// NOTE TO FUTURE SELF
// This is the main component for the planned live messaging feature for the web application
// If I want to successfully implement this, I will need to implement a web socket such as Socket.io
import * as React from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
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
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const messageReducer = useSelector((state: any) => state.messageReducer);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [roomId, setRoomId] = React.useState(null);
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
      // a user is logged in and we need to fetch all existing chat rooms
      dispatch(fetchAllContacts());
    }
  }, []);
  React.useEffect(() => {
    if (roomId !== null && user) {
      socket = io(baseURL);
      socket.emit("setup", user._id);
      socket.on("connected", () => {
        setSocketConnected(true);
      });
    }
  }, [user]);
  React.useEffect(() => {
    if (id) {
      id && dispatch(getSingleUser(id)); // this may be redunsnat as I am already brabbing a minified user list onn page load
      // this will fetch the message thread for the individual
      // double authentication
      user && id && dispatch(fetchMessageThread(id));
    }
  }, [id, location]);
  // React.useEffect(() => {
  //   if (roomId) {
  //     socket.emit("join room", roomId._id);
  //   }
  // }, [roomId]);
  React.useEffect(() => {
    if (messageReducer.hasOwnProperty("messages")) {
      socket = io(baseURL);

      socket.emit("join room", messageReducer._id);
      //console.log("hello, the message reducr is active");
      //setRoomId(messageReducer);
      selectedChatCompare = messageReducer;
    }
  }, [messageReducer]);
  // React.useEffect(() => {
  //   if (selectedUser) {
  //     Object.keys(selectedUser).length > 0 &&
  //       dispatch(fetchMessageThread(selectedUser._id));
  //   }
  //   // Now that we have established the sleected user, we can now do the message thread call here
  // }, [selectedUser]);
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
          setRoomId={setRoomId}
        />
      </Grid>
    </Grid>
  );
};

export default Messages;
