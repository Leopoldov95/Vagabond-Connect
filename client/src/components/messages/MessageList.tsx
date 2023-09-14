import * as React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, makeStyles, Theme, Typography } from "@material-ui/core";
import ListUser from "./ListUser";
import { removeMessageNotification } from "../../actions/message";
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
  //const userReducer = useSelector((state: any) => )
  const dispatch = useDispatch();
  const userProfile = useSelector((state: any) => state.singleUser);
  const contactList = useSelector((state: any) => state.contactsReducer);
  const msgNotificationReducer = useSelector(
    (state: any) => state.msgNotificationReducer
  );
  //const { id }: any = useParams();
  const classes = useStyles();
  const [selectedUser, setSelectedUser]: any = React.useState(null);
  const [allUsers, setAllUsers]: any = React.useState([]); // this state is to manage the users that will appear on the left hand side of the message bar
  // populate the local state if user has active messages
  // React.useEffect(() => {
  //   if (user) {
  //     console.log("setAllUsers will be populated");
  //   } else {
  //     console.log("no users in db");
  //   }
  // }, []);

  // trigger a change when a different user is selected
  React.useEffect(() => {
    if (Object.keys(userProfile).length > 0) {
      setSelectedUser(userProfile);
      const _id = userProfile._id;
      // if you have unread messages from the selected user, delete those notifications from the database
      if (msgNotificationReducer.hasOwnProperty(_id)) {
        // pass selected user id and remove from current user notification array
        dispatch(removeMessageNotification(_id));
      }
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
  // 11-15-22
  // we want to manage the msg notifications here
  // NOTE that the changes here need to reflect in the Navbar mail icon as well, hence why we are using a reducer
  /***
   * Logic
   * selectedUser is the person in which we have an open active chat
   * IF (selectedUser._id) has a property in the msgNotifReducer WITH a value GREATER than 0
   * THEN, we need to UPDATE the database to clear the notification
   * THEN, after the server has cleared the notification, we need to ping the client and updated the msgNotifReducer
   * WHICH will THEN clear that specific notification for the navbar anc prevent update on the message LIST
   */
  return (
    <Paper>
      <ul className={classes.container}>
        {allUsers.length < 1 && userProfile.length < 1 ? (
          <Typography className={classes.noMessages}>
            No Active Messages
          </Typography>
        ) : (
          <React.Fragment>
            {/* This check ensures that a duplicate user is not listed when selected AND in the users message db */}
            {allUsers.length > 0 &&
              allUsers.map(
                (listUser, idx) =>
                  listUser._id && (
                    <ListUser
                      key={idx}
                      user={listUser}
                      selectedUser={selectedUser?._id}
                      handleMobileNav={handleMobileNav}
                      notifications={
                        msgNotificationReducer.hasOwnProperty(listUser?._id)
                          ? msgNotificationReducer[listUser._id]
                          : 0
                      }
                    />
                  )
              )}
            {/* {userProfile &&
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
              )} */}
          </React.Fragment>
        )}
      </ul>
    </Paper>
  );
};

export default MessageList;
