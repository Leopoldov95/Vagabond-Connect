import * as React from "react";
import {
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  FavoriteBorder,
  Comment,
  Room,
  MoreVert,
  Edit,
  Delete,
} from "@material-ui/icons";

import Comments from "./Comments";
const useStyles = makeStyles((theme) => ({
  media: {
    height: "250px",
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
  card: {
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2),
    textAlign: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  buttonText: {
    fontSize: 12,
    marginLeft: theme.spacing(1),
  },
  postOwner: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  mapText: {
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    color: "#888",
    justifyContent: "center",
  },
}));

const Post = () => {
  /* make sure to create a state to manage likes  */
  const classes = useStyles();
  const menuId = "post-settings";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
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
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Edit className={classes.icon} />
        Edit
      </MenuItem>
      <MenuItem style={{ color: "red" }} onClick={handleMenuClose}>
        <Delete className={classes.icon} />
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <Card className={classes.card}>
      <div className={classes.postOwner}>
        <div style={{ display: "flex" }}>
          <div>
            <Avatar
              style={{ marginRight: 10 }}
              alt="post_owner_icon"
              src="https://images-cdn.9gag.com/photo/aK7r78Q_700b.jpg"
            />
          </div>
          <div>
            <Typography
              style={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "left",
              }}
            >
              The Wok
            </Typography>
            <Typography style={{ color: "#555", fontSize: 14 }}>
              {/*  {new Date().toLocaleString("en-US")} */} Oct 31st, 2021
            </Typography>
          </div>
        </div>
        <div>
          <IconButton aria-label="settings" onClick={handleProfileMenuOpen}>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {/*   <CardActionArea> */}
      <CardMedia
        className={classes.media}
        title="travel"
        image="https://images.unsplash.com/photo-1462759353907-b2ea5ebd72e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2831&q=80"
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          New Zealand Hobbiton
        </Typography>
        <Typography gutterBottom className={classes.mapText}>
          <Room /> New Zealand, Oceania
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
          laboriosam nihil aspernatur odit quam eum nostrum laborum, nulla
          deserunt necessitatibus architecto ratione impedit consequuntur vel ab
          nesciunt minus esse vitae? Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Non laboriosam nihil aspernatur odit quam eum
          nostrum laborum, nulla deserunt necessitatibus architecto ratione
          impedit consequuntur vel ab nesciunt minus esse vitae?
        </Typography>
      </CardContent>
      {/*  </CardActionArea> */}
      <Divider />
      <CardActions>
        <Button size="small" color="primary">
          <FavoriteBorder />
          <Typography className={classes.buttonText}>Like</Typography>
        </Button>
        <Button size="small" color="primary">
          {/* will want to show how many comments */}
          <Comment />
          <Typography className={classes.buttonText}>Comments</Typography>
        </Button>
      </CardActions>
      <Divider />
      <Comments />
      {renderMenu}
    </Card>
  );
};

export default Post;
