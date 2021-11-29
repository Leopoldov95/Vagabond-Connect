import {
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Theme,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import * as React from "react";
import { findOne } from "../../testData/helper";
import { blueGrey } from "@material-ui/core/colors";
import { MoreHoriz, Edit, Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  comment: {
    backgroundColor: blueGrey[50],
    borderRadius: 16,
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  avatar: {
    marginRight: 10,
  },
}));

const SubComments = (props: any) => {
  const classes = useStyles();
  const creator = findOne(props.comment.owner);
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [showComments, setShowComments] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="Comments Menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Edit style={{ marginRight: 8 }} />
        Edit
      </MenuItem>
      <MenuItem style={{ color: "red" }} onClick={handleMenuClose}>
        <Delete style={{ marginRight: 8 }} />
        Delete
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.container}>
      <Avatar
        alt="comment_icon"
        src={creator?.profile}
        className={classes.avatar}
      />
      <div className={classes.comment}>
        <Typography style={{ fontWeight: 500 }}>
          {creator?.firstName} {creator?.lastName}
        </Typography>

        <Typography>{props.comment.message}</Typography>
      </div>

      {user && user._id === props.comment.ownerId ? (
        <React.Fragment>
          <IconButton onClick={handleProfileMenuOpen}>
            <MoreHoriz />
          </IconButton>
          {renderMenu}
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default SubComments;
