// Since Navbar will be present on ALL pages, we will manage user auth here
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import {
  alpha,
  AppBar,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
  Theme,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import {
  Mail,
  Search,
  Cancel,
  ExpandMore,
  Home,
  Person,
  LibraryBooks,
  Settings,
  ExitToApp,
  Lock,
  Close,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { searchUsers } from "../api";
import SearchResults from "./search/Search";
import Notifications from "./Notifications";
import { MobileNav } from "./MobileNav";
import { editUserDetails } from "../actions/users";
interface Props {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  nav: {
    backgroundColor: lightGreen[700],
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: lightGreen[700],
    maxWidth: 1440,
    width: "100%",
    margin: "auto",
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      color: lightGreen[100],
    },
    [theme.breakpoints.down(960)]: {
      backgroundColor: "white",
      color: lightGreen[700],
      width: 35,
      height: 35,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
    },
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
    position: "relative",
    display: "flex",
    paddingLeft: theme.spacing(1),
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "45%",
    },
    [theme.breakpoints.down(768)]: {
      display: (props: Props) => (props.open ? "flex" : "none"),
      width: "80%",
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up(768)]: {
      display: "none",
    },
  },
  icons: {
    alignItems: "baseline",
    display: (props: Props) => (props.open ? "none" : "flex"),
    [theme.breakpoints.down(768)]: {
      alignItems: "center",
      marginLeft: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
    },
  },
  routerLink: {
    color: "inherit",
    display: "flex",
    alignItems: "center",
  },

  avatar: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  mobileMenuBtn: {
    cursor: "pointer",
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  searchButton: {
    marginRight: theme.spacing(2),
    backgroundColor: "white",
    color: lightGreen[700],
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    padding: "4px",
    [theme.breakpoints.up(768)]: {
      display: "none",
    },
  },
  hideMobile: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));
const Navbar = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("vagabond_connect_profile"))
  ); // profile is being access from local storage, which was set in the reducer file auth.js
  const authUser = useSelector((state: any) => state.userAuthReducer);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [showMenu, setShowMenu] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [showNotifications, setShowNotifcations] = React.useState(false);
  // Will need to use redux here!
  const [notifications, setNotifcations] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const socket = useSelector((state: any) => state.socketReducer);
  // Note that we will be using useEffect in order to update the notifucations for socket
  React.useEffect(() => {
    const token = user?.token;
    // JWT ...
    if (token) {
      // decodes the token, checking if tken is expired. If so, user must sign back in
      const decodedToken: any = decode(token);
      if (decodedToken?.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("vagabond_connect_profile")));
    // hise the notifications on page change
    setShowNotifcations(false);
  }, [location]);
  React.useEffect(() => {
    if (search.length > 0) {
      const timeOutId = setTimeout(async () => {
        const { data }: any = await searchUsers(search);
        setSearchResult(data);
      }, 500);
      return () => clearTimeout(timeOutId);
      // will want to dispatch an action that fetches all users posts
      // might not need external files as all user lookup will be handled here...
    } else {
      // need this so old results don't appear when creating a new search
      setSearchResult([]);
    }
  }, [search]);
  React.useEffect(() => {
    if (socket) {
      // this event is being emmitted fom the server
      socket.on("notification", (data) => {
        setNotifcations(data);
      });
    }
  }, [socket]);
  // sets inital notifcations
  React.useEffect(() => {
    if (authUser.authData) {
      setNotifcations(authUser.authData.result.notifications);
    } else if (user) {
      setNotifcations(user.result.notifications);
    }
  }, [authUser, user]);

  const classes = useStyles({ open });
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    //handleMobileMenuClose();
  };
  const handleMenuLogout = () => {
    setAnchorEl(null);
    logout();
    //handleMobileMenuClose();
  };
  const handleNotifications = () => {
    if (user) {
      // need to run a dispatch and update the records in the databse, THEN use the nptifications socket listeneer and send the newly updated empty db onto the client
      setNotifcations([]);
      dispatch(editUserDetails({ notifications: [] }));
      //clearNotifications(user.result?._id);
    }
  };
  const handleMobileBtn = () => {
    setShowMenu(!showMenu);
    if (showNotifications) setShowNotifcations(false);
  };
  const handleNotifBtn = () => {
    setShowNotifcations(!showNotifications);
    if (showMenu) setShowMenu(false);
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    dispatch({ type: "SNACKBAR_SUCCESS", payload: "You Have Logged Out." });
    setUser(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user && (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <Link
              to={`/profile/${user?.result?._id}`}
              className={classes.routerLink}
            >
              <Person style={{ marginRight: 10 }} />
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link
              to={`/settings/${user?.result?._id}`}
              className={classes.routerLink}
            >
              <Settings style={{ marginRight: 10 }} />
              Settings
            </Link>
          </MenuItem>
        </div>
      )}

      {user ? (
        <MenuItem onClick={handleMenuLogout}>
          <ExitToApp style={{ marginRight: 10 }} />
          Sign Out
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <Link to="/auth" className={classes.routerLink}>
            <Lock style={{ marginRight: 10 }} />
            Sign In
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  // can pass our state as props to use css boolean values

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.nav}>
        <Toolbar className={classes.toolbar}>
          {/* Variant is style, component is tag */}
          <Typography variant="h6" className={classes.logoLg}>
            Vagabond Connect
          </Typography>
          <div className={classes.search}>
            <Search />
            <InputBase
              placeholder="Find Users..."
              className={classes.input}
              fullWidth
              value={search}
              onChange={handleChange}
            />
            <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
            {search.length > 1 ? (
              <SearchResults
                results={searchResult}
                setSearchResult={setSearchResult}
                setSearch={setSearch}
                search={search}
              />
            ) : (
              ""
            )}
          </div>
          <div className={classes.icons}>
            <Search
              className={classes.searchButton}
              onClick={() => setOpen(true)}
            />
            <div className={`${classes.item} ${classes.hideMobile}`}>
              <Link to="/" className={classes.link}>
                <Home />
                <Typography className={classes.text}>Homepage</Typography>
              </Link>
            </div>
            <div className={`${classes.item} ${classes.hideMobile}`}>
              <Link to="/friends" className={classes.link}>
                <Person />
                <Typography className={classes.text}>Friends</Typography>
              </Link>
            </div>
            <div className={`${classes.item} ${classes.hideMobile}`}>
              <Link to="/resources" className={classes.link}>
                <LibraryBooks />
                <Typography className={classes.text}>Resources</Typography>
              </Link>
            </div>
            <div className={classes.item}>
              <Link to="/messages" className={classes.link}>
                <Mail />
                <Typography className={classes.text}>Messages</Typography>
              </Link>
            </div>
            <div className={classes.item} onClick={handleNotifBtn}>
              {/* <Badge color="secondary" badgeContent={notifications.length}></Badge> */}
              <Badge color="secondary" badgeContent={99}>
                <NotificationsIcon style={{ marginBottom: "4px" }} />
              </Badge>

              <Typography className={classes.text}>Notifications</Typography>
            </div>
          </div>
          <div className={classes.avatar} onClick={handleProfileMenuOpen}>
            <Divider
              orientation="vertical"
              flexItem
              style={{ marginRight: 10 }}
              className={classes.hideMobile}
            />

            <Avatar
              alt="account_icon"
              aria-label="account of current user"
              aria-haspopup="true"
              src={
                user
                  ? user?.result?.profile_cloudinary
                  : "img/auth/default.jpeg"
              }
            />
            <ExpandMore
              style={{ marginLeft: 10 }}
              className={classes.hideMobile}
            />
            <Divider
              orientation="vertical"
              flexItem
              className={classes.hideMobile}
              style={{ marginLeft: 10 }}
            />
          </div>
          {/* Mobile Menu */}
          <div className={classes.mobileMenuBtn} onClick={handleMobileBtn}>
            <div style={{ transform: "scale(1.5)" }}>
              {showMenu ? <Close /> : <MenuIcon />}
            </div>
          </div>

          <MobileNav
            active={showMenu}
            setActive={setShowMenu}
            logout={logout}
          />
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Notifications
        isActive={showNotifications}
        notifications={notifications}
        clearNotifications={handleNotifications}
      />
    </React.Fragment>
  );
};

export default Navbar;
