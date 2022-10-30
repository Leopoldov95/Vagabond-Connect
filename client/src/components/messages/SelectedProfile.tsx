import * as React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Theme,
  makeStyles,
  Paper,
  Avatar,
  Typography,
  IconButton,
  withWidth,
  Button,
} from "@material-ui/core";
import { Visibility, Delete, ArrowBackIos } from "@material-ui/icons";
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
    top: "73px",
    width: "75%",
    zIndex: 5,
    [theme.breakpoints.down(960)]: {
      width: "83%",
    },
    [theme.breakpoints.down("xs")]: {
      top: theme.spacing(8),
      left: 0,
      width: "100%",
      padding: "8px 1rem",
    },
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
  btn: {
    [theme.breakpoints.down("xs")]: {
      minWidth: 0,
      borderRadius: 30,
    },
  },
  btnNav: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  profileName: {
    [theme.breakpoints.down(400)]: {
      display: "none",
    },
  },
}));
const SelectedProfile = ({ width, handleMobileNav }) => {
  const selectedUser = useSelector((state: any) => state.singleUser);
  const classes = useStyles();
  const isSmallScreen = /xs|sm/.test(width);
  return (
    <Paper className={classes.container}>
      <div className={classes.left}>
        <div className={classes.btnNav}>
          <IconButton color="primary" onClick={handleMobileNav}>
            <ArrowBackIos />
          </IconButton>
        </div>
        <Avatar
          alt="account_icon"
          aria-label="account of current user"
          aria-haspopup="true"
          src={selectedUser.profile_cloudinary}
        />
        <Typography className={classes.profileName}>
          {selectedUser.firstName} {selectedUser.lastName}
        </Typography>
      </div>
      <div className={classes.action}>
        <Link to={`/profile/${selectedUser._id}`}>
          <Button
            style={{ backgroundColor: lightGreen[500], color: "white" }}
            variant="contained"
            size={isSmallScreen ? "small" : "medium"}
            className={classes.btn}
          >
            {isSmallScreen ? <Visibility /> : "Profile"}
          </Button>
        </Link>

        <Button
          variant="contained"
          color="secondary"
          size={isSmallScreen ? "small" : "medium"}
          className={classes.btn}
        >
          {isSmallScreen ? <Delete /> : "Delete Chat"}
        </Button>
      </div>
    </Paper>
  );
};
SelectedProfile.propTypes = {
  /** The name of the current breakpoint, for example "sm" */
  width: PropTypes.string.isRequired,
};

export default withWidth()(SelectedProfile);
