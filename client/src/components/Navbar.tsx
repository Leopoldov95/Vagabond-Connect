import { useState } from "react";
import {
  alpha,
  AppBar,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
  Badge,
  Theme,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import {
  Mail,
  Search,
  Notifications,
  Cancel,
  Public,
  ExpandMore,
  Home,
  Person,
  LibraryBooks,
} from "@material-ui/icons";

interface Props {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: lightGreen[700],
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
    "&:hover": {
      cursor: "pointer",
    },
  },
  icon: {
    /*  marginRight: theme.spacing(1), */
  },
  text: {
    fontWeight: 500,
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  search: {
    display: "flex",
    paddingLeft: theme.spacing(1),
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      display: (props: Props) => (props.open ? "flex" : "none"),
      width: "70%",
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  icons: {
    alignItems: "center",
    display: (props: Props) => (props.open ? "none" : "flex"),
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  badge: {
    display: "flex",
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));
function Navbar() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
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
  const menuId = "primary-search-account-menu";
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
    </Menu>
  );

  // can pass our state as props to use css boolean values
  const classes = useStyles({ open });
  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: lightGreen[700] }}>
        <Toolbar className={classes.toolbar}>
          {/* Variant is style, component is tag */}
          <Typography variant="h6" className={classes.logoLg}>
            Vagabond Connect
          </Typography>
          <Typography variant="h6" className={classes.logoSm}>
            <Public />
          </Typography>
          <div className={classes.search}>
            <Search />
            <InputBase
              placeholder="Search..."
              className={classes.input}
              fullWidth
            />
            <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
          </div>
          <div className={classes.icons}>
            <Search
              className={classes.searchButton}
              onClick={() => setOpen(true)}
            />
            <div className={classes.item}>
              <Home className={classes.icon} />
              <Typography className={classes.text}>Homepage</Typography>
            </div>
            <div className={classes.item}>
              <Person className={classes.icon} />
              <Typography className={classes.text}>Friends</Typography>
            </div>
            <div className={classes.item}>
              <LibraryBooks className={classes.icon} />
              <Typography className={classes.text}>Resources</Typography>
            </div>
            <div className={classes.item}>
              {/*    <Badge
                badgeContent={4}
                color="secondary"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                className={classes.badge}
              > */}
              <Mail />
              <Typography className={classes.text}>Messages</Typography>
              {/*  </Badge> */}
            </div>
            <div className={classes.item}>
              {/* <Badge
                badgeContent={2}
                color="secondary"
                className={classes.badge}
              > */}
              <Notifications />
              <Typography className={classes.text}>Notifications</Typography>
              {/*  </Badge> */}
            </div>
          </div>
          <div className={classes.avatar} onClick={handleProfileMenuOpen}>
            <Divider
              orientation="vertical"
              flexItem
              style={{ marginRight: 10 }}
            />

            <Avatar
              alt="account_icon"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              src="https://melmagazine.com/wp-content/uploads/2021/01/66f-1.jpg"
            />
            <ExpandMore style={{ marginLeft: 10 }} />
            <Divider
              orientation="vertical"
              flexItem
              style={{ marginLeft: 10 }}
            />
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
}

export default Navbar;
