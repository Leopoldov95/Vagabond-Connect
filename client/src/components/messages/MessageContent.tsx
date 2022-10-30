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
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { MailOutlined } from "@material-ui/icons";
import CreateMessage from "./CreateMessage";
import SelectedProfile from "./SelectedProfile";
import MessageBox from "./MessageBox";
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
    bottom: "92px",
  },
}));
const MessageContent = ({ handleMobileNav }) => {
  const { id }: any = useParams();
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const messageReducer = useSelector((state: any) => state.messageReducer);
  const userProfile = useSelector((state: any) => state.singleUser);
  const selectedUser = useSelector((state: any) => state.singleUser);
  const socket = useSelector((state: any) => state.socketReducer);
  const location = useLocation();
  const classes = useStyles();
  const [param, setParam] = React.useState(id);
  const [isTyping, setIsTypeing] = React.useState(false);

  console.log(messageReducer);

  React.useEffect(() => {
    if (socket) {
      socket.on("composing", (senderId) => {
        console.log("param url");
        console.log(param);
        if (param === senderId) {
          setIsTypeing(true);
        }
      });
      socket.on("newMessage", (data) => {
        console.log("You recieved a new message");
        console.log(data);
      });
    }
    // setIsTypeing(true);
  }, [socket]);

  React.useEffect(() => {
    if (isTyping) {
      setTimeout(() => {
        setIsTypeing(false);
      }, 3000);
    }
  }, [isTyping]);
  React.useEffect(() => {
    const updated = id;
    console.log(location);
    console.log(id);
    setParam(updated);
  }, [location]);
  // // this code is a bit redundant, may need to remove later

  ////// ************* //////////
  //console.log(messageReducer);

  return (
    <Container className={classes.container}>
      <div className={classes.messageContainer}>
        {id && selectedUser && (
          <SelectedProfile handleMobileNav={handleMobileNav} />
        )}
        {user &&
        !messageReducer.hasOwnProperty("message") &&
        messageReducer.hasOwnProperty("messages") ? (
          messageReducer.messages.map((message, i) => (
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
      </div>

      {id && selectedUser && <CreateMessage selectedUser={selectedUser._id} />}
      {isTyping && (
        <div className={classes.typingContainer}>
          <Avatar
            style={{ margin: "0 40px 0 10px" }}
            src={userProfile.profile_cloudinary}
          />
          <div className="dot-flashing"></div>
        </div>
      )}
    </Container>
  );
};

export default MessageContent;
