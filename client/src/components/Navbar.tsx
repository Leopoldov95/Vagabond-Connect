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
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { searchUsers } from "../api";
import SearchResults from "./search/Search";
import Notifications from "./Notifications";
import { editUserDetails } from "../actions/users";
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
    display: "none",
    lineHeight: 1,
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
    [theme.breakpoints.down("xs")]: {
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
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "30%",
    [theme.breakpoints.down("xs")]: {
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
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));
const Navbar = () => {
  const DUMMY_DATA = [
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
    {
      firstName: "Leo",
      lastName: "Ortega",
      pofile: "img/auth/default.jpeg",
      message: "liked your post",
    },
  ];
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("vagabond_connect_profile"))
  ); // profile is being access from local storage, which was set in the reducer file auth.js
  const authUser = useSelector((state: any) => state.userAuthReducer);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [showNotifications, setShowNotifcations] = React.useState(false);
  // Will need to use redux here!
  const [notifications, setNotifcations] = React.useState(DUMMY_DATA);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const socket = useSelector((state: any) => state.socketReducer);
  console.log("hello fro  navbar");
  console.log(socket);
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
    }
  }, [authUser]);
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
      <AppBar position="fixed" style={{ backgroundColor: lightGreen[700] }}>
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
            <div className={classes.item}>
              <Link to="/" className={classes.link}>
                <Home />
                <Typography className={classes.text}>Homepage</Typography>
              </Link>
            </div>
            <div className={classes.item}>
              <Link to="/friends" className={classes.link}>
                <Person />
                <Typography className={classes.text}>Friends</Typography>
              </Link>
            </div>
            <div className={classes.item}>
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
            <div
              className={classes.item}
              onClick={() => setShowNotifcations(!showNotifications)}
            >
              <Badge color="secondary" badgeContent={notifications.length}>
                <NotificationsIcon />
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
              aria-haspopup="true"
              src={
                user
                  ? user?.result?.profile_cloudinary
                  : "img/auth/default.jpeg"
              }
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
      {showNotifications && (
        <Notifications
          notifications={notifications}
          clearNotifications={handleNotifications}
        />
      )}
    </React.Fragment>
  );
};

export default Navbar;
