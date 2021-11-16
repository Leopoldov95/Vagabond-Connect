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
  Settings,
  ExitToApp,
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
  link: {
    textAlign: "center",
    textDecoration: "none",
    color: "inherit",
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
    alignItems: "end",
    display: (props: Props) => (props.open ? "none" : "flex"),
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  badge: {},
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));
const Navbar = () => {
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
      <MenuItem onClick={handleMenuClose}>
        <a
          href="/profile"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Person style={{ marginRight: 10 }} />
          Profile
        </a>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <a
          href="/settings"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Settings style={{ marginRight: 10 }} />
          Settings
        </a>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        {" "}
        <ExitToApp style={{ marginRight: 10 }} />
        Sign Out
      </MenuItem>
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
              <a href="/" className={classes.link}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>Homepage</Typography>
              </a>
            </div>
            <div className={classes.item}>
              <Person className={classes.icon} />
              <Typography className={classes.text}>Friends</Typography>
            </div>
            <div className={classes.item}>
              <a href="/resources" className={classes.link}>
                <LibraryBooks className={classes.icon} />
                <Typography className={classes.text}>Resources</Typography>
              </a>
            </div>
            <div className={classes.item}>
              <Badge
                badgeContent={4}
                color="secondary"
                className={classes.badge}
              >
                <Mail />
              </Badge>
              <Typography className={classes.text}>Messages</Typography>
            </div>
            <div className={classes.item}>
              <Badge
                badgeContent={2}
                color="secondary"
                className={classes.badge}
              >
                <Notifications />
              </Badge>
              <Typography className={classes.text}>Notifications</Typography>
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
};

export default Navbar;
