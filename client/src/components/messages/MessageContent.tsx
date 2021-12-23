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
import { useHistory } from "react-router-dom";
import { MailOutlined } from "@material-ui/icons";
const useStyles = makeStyles((theme: Theme) => ({
  noMail: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
    marginTop: theme.spacing(2),
  },
}));
const MessageContent = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const classes = useStyles();
  console.log(user);
  /*  React.useEffect(() => {
    if (!user) {
      history.push("/auth");
    }
  }, []); */
  return (
    <Container>
      {user && user.messages.length > 0 ? (
        <Typography>You have messages!</Typography>
      ) : (
        <div className={classes.noMail}>
          <Typography variant="h4">You Have No Messages</Typography>
          <MailOutlined fontSize="large" style={{ marginLeft: 10 }} />
        </div>
      )}
    </Container>
  );
};

export default MessageContent;
