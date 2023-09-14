import * as React from "react";
import io from "socket.io-client";
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

let selectedChatCompare;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      maxHeight: "100vh",
      position: "relative",
    },
  },
  mobilePage: {
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      transform: "translateX(0)",
      transition: "all ease-in-out 300ms",
    },
  },
  mobileHide: {
    [theme.breakpoints.down("xs")]: {
      transform: "translateY(-100%)",
    },
  },
  mobileActive: {
    [theme.breakpoints.down("xs")]: {
      transform: "translateX(0)",
    },
  },
}));
export const Messages = ({ socket }) => {
  //const socket: any = React.useRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { id }: any = useParams();

  const user: any = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const messageReducer = useSelector((state: any) => state.messageReducer);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [listActive, setListActive] = React.useState(true);
  const [currentId, setCurrentId] = React.useState<string | any>(null);

  // throws a warning that the user must be logged in in order to view the messages
  // only makes a connection to socket.io if there is an active user

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
    if (id) {
      id && dispatch(getSingleUser(id)); // this may be redunsnat as I am already grabbing a minified user list onn page load
      // this will fetch the message thread for the individual
      // double authentication
      user && id && dispatch(fetchMessageThread(id));
      // if location does not match, then we know that it will always be a new message
      setCurrentId(id);
      if (id !== currentId) {
        setListActive(false);
      }
    }
  }, [id, location]);
  React.useEffect(() => {
    if (messageReducer.hasOwnProperty("messages")) {
      socket = io(baseURL);

      socket.emit("join room", messageReducer._id);
      //console.log("hello, the message reducr is active");
      //setRoomId(messageReducer);
      selectedChatCompare = messageReducer;
    }
  }, [messageReducer]);
  const handleMobileNav: VoidFunction = () => {
    setListActive(!listActive);
  };

  console.log(id);
  return (
    <Grid container className={classes.container}>
      <Grid
        className={`${listActive ? classes.mobileActive : classes.mobileHide} ${
          classes.mobilePage
        }`}
        item
        xs={12}
        sm={2}
        md={3}
      >
        <MessageList handleMobileNav={handleMobileNav} />
      </Grid>
      <Grid
        className={`${listActive ? classes.mobileHide : classes.mobileActive} ${
          classes.mobilePage
        }`}
        item
        xs={12}
        sm={10}
        md={9}
      >
        <MessageContent
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          selectedChatCompare={selectedChatCompare}
          handleMobileNav={handleMobileNav}
        />
      </Grid>
    </Grid>
  );
};

export default Messages;
