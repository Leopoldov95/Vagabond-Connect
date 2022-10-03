import * as React from "react";
import { useSelector } from "react-redux";
import {
  Theme,
  makeStyles,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { Visibility, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { lightGreen } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 2rem",
    position: "fixed",
    right: 0,
    top: theme.spacing(8),
    width: "75%",
    zIndex: 5,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  action: {
    display: "flex",
    gap: theme.spacing(2),
  },
}));
const SelectedProfile = () => {
  const selectedUser = useSelector((state: any) => state.singleUser);
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <div className={classes.left}>
        <Avatar
          alt="account_icon"
          aria-label="account of current user"
          aria-haspopup="true"
          src={selectedUser.profile_cloudinary}
        />
        <Typography>
          {selectedUser.firstName} {selectedUser.lastName}
        </Typography>
      </div>
      <div className={classes.action}>
        <Link to={`/profile/${selectedUser._id}`}>
          <Button
            style={{ backgroundColor: lightGreen[500], color: "white" }}
            variant="contained"
          >
            Profile
          </Button>
        </Link>

        <Button variant="contained" color="secondary">
          Delete Chat
        </Button>
      </div>
    </Paper>
  );
};

export default SelectedProfile;
//  {/* <Link to={`/profile/${selectedUser._id}`}>
//             <IconButton className={classes.icon}>
//               <Visibility />
//             </IconButton>
//           </Link>

//           <IconButton className={classes.icon} color="secondary">
//             <Delete />
//           </IconButton> */}
