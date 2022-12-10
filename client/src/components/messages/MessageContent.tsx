// This component will display the active messages for a selected person
// will assume a user is logged in
import * as React from "react";
import {
  Typography,
  Container,
  makeStyles,
  Theme,
  Avatar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { MailOutlined } from "@material-ui/icons";
import CreateMessage from "./CreateMessage";
import SelectedProfile from "./SelectedProfile";
import MessageBox from "./MessageBox";
import { deleteMessageThread } from "../../actions/message";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(15),
    height: "85vh",
    [theme.breakpoints.down("xs")]: {
      height: "98vh",
    },
  },
  messageContainer: {
    overflow: "auto",
    height: "100%",
  },
  noMail: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
    marginTop: theme.spacing(2),
    flexDirection: "column",
  },
  typingContainer: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: theme.spacing(9),
    paddingLeft: "5px",
  },
  typeAvatar: {
    margin: "0 40px 0 10px",
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));
const MessageContent = ({ handleMobileNav }) => {
  const { id }: any = useParams();
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const dispatch = useDispatch();
  const history = useHistory();
  const messageReducer = useSelector((state: any) => state.messageReducer);
  const userProfile = useSelector((state: any) => state.singleUser);
  const selectedUser = useSelector((state: any) => state.singleUser);
  const socket = useSelector((state: any) => state.socketReducer);
  const contactList = useSelector((state: any) => state.contactsReducer);
  const location = useLocation();
  const classes = useStyles();
  const messagesEndRef: any = React.useRef(null);
  // const [param, setParam] = React.useState(id);
  const [isTyping, setIsTyping] = React.useState(false);
  const [messages, setMessages] = React.useState(messageReducer?.messages);
  //const [render, setRender] = React.useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // const scrollRef: any = React.useRef(null);
  // React.useLayoutEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollIntoView();
  //   }
  // }, []);

  // React.useEffect(() => {
  //   console.log("hi plz");
  //   // setRender(true);
  //   scrollToBottom();
  // }, []);

  //React.useEffect(() => {
  // removed useffect as it was causing weird render issues
  if (socket) {
    // console.log(id);
    socket.on("composing", (senderId) => {
      if (id === senderId) {
        setIsTyping(true);
      }
    });
    // socket.on("newMessage", (data) => {
    //   console.log("You recieved a new message");
    //   // a new message was detected by the server
    //   // we need to update the message reducer state
    //   // then display that info to the client
    // });
  }
  // setIsTyping(true);
  // }, []);

  React.useEffect(() => {
    if (isTyping) {
      setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }
  }, [isTyping]);
  // React.useEffect(() => {
  //   // const updated = id;
  //   setParam(id);
  //   console.log("location changed!!");
  //   //console.log(updated);
  // }, [location, id]);

  React.useEffect(() => {
    // only update the local chat IF user is in correct channel
    const { users } = messageReducer;
    if (users) {
      if (users.indexOf(id) !== -1) {
        setMessages(messageReducer);
        scrollToBottom();
      }
    }
  }, [messageReducer]);

  ////// ************* //////////

  const handleDelete = (id: String) => {
    // this will dispatch an API function, that will remove this chat from the user's list of active chats
    const { messageRoom } = contactList.filter((item) => item._id === id)[0];
    if (messageRoom) {
      dispatch(deleteMessageThread(messageRoom));
    }
    history.push("/messages");
  };

  return (
    <Container className={classes.container}>
      <div className={classes.messageContainer}>
        {id && selectedUser && (
          <SelectedProfile
            handleMobileNav={handleMobileNav}
            handleDelete={handleDelete}
          />
        )}
        {user &&
        id &&
        // !messageReducer.hasOwnProperty("message") &&
        // messageReducer.hasOwnProperty("messages") ? (
        //   messageReducer.messages.map((message, i) => (
        messages !== undefined &&
        messages.hasOwnProperty("messages") ? (
          messages.messages.map((message, i) => (
            <MessageBox
              key={i}
              createdAt={message.createdAt}
              message={message.message}
              messageOwner={message.createdBy}
              isUser={user._id === message.createdBy}
              avatar={
                user._id === message.createdBy
                  ? user.profile_cloudinary
                  : userProfile.profile_cloudinary
              }
            />
          ))
        ) : (
          <div className={classes.noMail}>
            <Typography variant="h4">No Messages!</Typography>
            <MailOutlined fontSize="large" style={{ marginLeft: 10 }} />
          </div>
        )}
        <div ref={messagesEndRef} />
        {/* <div style={{ height: 100 }} ref={scrollRef}></div> */}
      </div>

      {id && selectedUser && <CreateMessage selectedUser={selectedUser._id} />}
      {isTyping && (
        <div className={classes.typingContainer}>
          <Avatar
            className={classes.typeAvatar}
            src={userProfile.profile_cloudinary}
          />
          <div className="dot-flashing"></div>
        </div>
      )}
    </Container>
  );
};

export default MessageContent;
