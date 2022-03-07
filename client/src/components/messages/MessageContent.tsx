// This component will display the active messages for a selected person
// will assume a user is logged in
import * as React from "react";
import {
  Typography,
  Grid,
  Container,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { MailOutlined } from "@material-ui/icons";
import CreateMessage from "./CreateMessage";
import MessageBox from "./MessageBox";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(9),
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
const MessageContent = ({ selectedUser, setSelectedUser }) => {
  const history = useHistory();
  const { id }: any = useParams();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const messageReducer = useSelector((state: any) => state.messageReducer);
  const classes = useStyles();

  /*  React.useEffect(() => {
    if (!user) {
      history.push("/auth");
    }
  }, []); */
  return (
    <Container className={classes.container}>
      {user && !messageReducer.hasOwnProperty("message") ? (
        messageReducer.map((d, i) => (
          <MessageBox
            key={i}
            createdAt={d.createdAt}
            message={d.message}
            messageOwner={d.messageOwner}
            isUser={user._id === d.messageOwner}
          />
        ))
      ) : (
        <div className={classes.noMail}>
          <Typography variant="h4">{messageReducer.message}</Typography>
          <MailOutlined fontSize="large" style={{ marginLeft: 10 }} />
        </div>
      )}
      {id && selectedUser && <CreateMessage selectedUser={selectedUser._id} />}
    </Container>
  );
};

export default MessageContent;
