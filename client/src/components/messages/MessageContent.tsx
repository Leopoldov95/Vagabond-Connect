// This component will display the active messages for a selected person
// will assume a user is logged in
import * as React from "react";
import { Typography, Container, makeStyles, Theme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MailOutlined } from "@material-ui/icons";
import CreateMessage from "./CreateMessage";
import MessageBox from "./MessageBox";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(9),
  },
  messageContainer: {
    overflow: "auto",
  },
  noMail: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
    marginTop: theme.spacing(2),
  },
}));
const MessageContent = ({
  selectedUser,
  setSelectedUser,
  selectedChatCompare,
  setRoomId,
}) => {
  const { id }: any = useParams();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const messageReducer = useSelector((state: any) => state.messageReducer);
  const userProfile = useSelector((state: any) => state.singleUser);
  const classes = useStyles();

  // this code is a bit redundant, may need to remove later

  ////// ************* //////////
  //console.log(messageReducer);
  return (
    <Container className={classes.container}>
      <div className={classes.messageContainer}>
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
            <Typography variant="h4">{messageReducer.message}</Typography>
            <MailOutlined fontSize="large" style={{ marginLeft: 10 }} />
          </div>
        )}
      </div>

      {id && selectedUser && <CreateMessage selectedUser={selectedUser._id} />}
    </Container>
  );
};

export default MessageContent;
