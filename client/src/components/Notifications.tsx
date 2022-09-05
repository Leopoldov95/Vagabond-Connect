import {
  Theme,
  Paper,
  makeStyles,
  Button,
  Divider,
  Avatar,
  Typography,
} from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import React from "react";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "fixed",
    zIndex: 9999,
    top: "60px",
    right: theme.spacing(15),
    width: "300px",
    height: "auto",
    overflow: "scroll",
    maxHeight: "90%",
    padding: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  subContainer: {
    marginTop: theme.spacing(1),
  },
  item: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: blueGrey[100],
    },
  },
  empty: {
    textAlign: "center",
    color: "grey",
  },
}));
// Badge has to be a top level stte. will be using redux
const Notifications = ({ notifications, clearNotifications }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <div className={classes.header}>
        <h4>Notifications</h4>
        <Button onClick={clearNotifications} color="primary" size="small">
          Clear
        </Button>
      </div>
      <Divider />
      <div className={classes.subContainer}>
        {/* This section will need to be mapped over */}
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <React.Fragment>
              <div className={classes.item}>
                <Avatar
                  className={classes.avatar}
                  alt="account_icon"
                  src={item.userImgURL}
                />
                <Typography variant="body2">{item.message}</Typography>
              </div>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography className={classes.empty}>No Notifications</Typography>
        )}
      </div>
    </Paper>
  );
};

export default Notifications;
