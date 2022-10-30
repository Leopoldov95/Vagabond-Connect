import * as React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, makeStyles, Theme, Typography } from "@material-ui/core";
import ListUser from "./ListUser";
//import { fetchMessageThread } from "../../actions/message";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(9),
  },
  noMessages: {
    color: "gray",
    textAlign: "center",
  },
}));
const MessageList = ({ handleMobileNav }) => {
  //const dispatch = useDispatch();
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const userProfile = useSelector((state: any) => state.singleUser);
  const contactList = useSelector((state: any) => state.contactsReducer);
  const msgNotificationReducer = useSelector(
    (state: any) => state.msgNotificationReducer
  );
  //const { id }: any = useParams();
  const classes = useStyles();
  const [selectedUser, setSelectedUser]: any = React.useState(null);
  const [alluser, setAllUsers]: any = React.useState([]); // this state is to manage the users that will appear on the left hand side of the message bar
  // populate the local state if user has active messages
  // React.useEffect(() => {
  //   if (user) {
  //     console.log("setAllUsers will be populated");
  //   } else {
  //     console.log("no users in db");
  //   }
  // }, []);
  React.useEffect(() => {
    if (Object.keys(userProfile).length > 0) {
      setSelectedUser(userProfile);
    }
  }, [userProfile]);
  React.useEffect(() => {
    setAllUsers(contactList);
  }, [contactList]);
  // React.useEffect(() => {
  //   setSelectedUser(userProfile);
  //   // when we change the selected user, we will automitcally fetch the message thread for that user
  //   selectedUser && dispatch(fetchMessageThread(selectedUser._id));
  // }, [id, selectedUser]);

  // since we will only be messaging one user at a time, we can do the following
  // on page load, start to populate the current message p[age wioth existing messages from the authenticate user
  // put the user I am currently messagind id onto the url
  // ecery time I want to view messages from another user, I click their icon and will make an api call to the server t retrieve that partcular user
  // messages must be ordered from most recent to oldest
  // for now, the only wayt to start a messaging thread is to start a mwssage by ivisitng the users profile

  // have the current user I'm messaging be highlighted
  // its okay to have prospective messages here, if I don't send a message to prospective user, won't save to db

  // 10-23-22 The reson why the listUseris not updating is because we are using the _id from the Message collextion

  return (
    <Paper>
      <ul className={classes.container}>
        {alluser.length < 1 && userProfile.length < 1 ? (
          <Typography className={classes.noMessages}>
            No Active Messages
          </Typography>
        ) : (
          <React.Fragment>
            {/* This check ensures that a duplicate user is not listed when selected AND in the users message db */}
            {alluser.length > 0 &&
              alluser.map(
                (listUser, idx) =>
                  listUser._id !== userProfile._id && (
                    <ListUser
                      key={idx}
                      user={listUser}
                      selectedUser={selectedUser?._id}
                      handleMobileNav={handleMobileNav}
                      notifications={
                        msgNotificationReducer.hasOwnProperty(selectedUser?._id)
                          ? true
                          : 0
                      }
                    />
                  )
              )}
            {userProfile &&
              Object.keys(userProfile).length > 0 &&
              userProfile._id !== user._id && (
                <ListUser
                  selectedUser={selectedUser?._id}
                  user={userProfile}
                  handleMobileNav={handleMobileNav}
                  notifications={
                    msgNotificationReducer.hasOwnProperty(selectedUser?._id)
                      ? msgNotificationReducer[selectedUser?._id]
                      : 0
                  }
                />
              )}
          </React.Fragment>
        )}
      </ul>
    </Paper>
  );
};

export default MessageList;

// /  <div className={classes.actionContent}>
// <Link to={`/profile/${user._id}`}>
//   <IconButton className={classes.icon}>
//     <Visibility />
//   </IconButton>
// </Link>

//   <IconButton className={classes.icon}>
//     <MailOutline />
//   </IconButton>
// </Link>
// <IconButton className={classes.icon} color="secondary">
//   <Delete />
// </IconButton>
// </div>
