import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import {
  ExitToApp,
  Home,
  Person,
  Settings,
  AccountCircle,
  LibraryBooks,
} from "@material-ui/icons";
import { lightGreen } from "@material-ui/core/colors";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: "100vh",
    color: "white",
    backgroundColor: lightGreen[700],
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
const Leftbar = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <Home className={classes.icon} />
        <Typography className={classes.text}>Homepage</Typography>
      </div>
      <div className={classes.item}>
        <Person className={classes.icon} />
        <Typography className={classes.text}>Friends</Typography>
      </div>
      <div className={classes.item}>
        <AccountCircle className={classes.icon} />
        <Typography className={classes.text}>Account</Typography>
      </div>
      <div className={classes.item}>
        <LibraryBooks className={classes.icon} />
        <Typography className={classes.text}>Resources</Typography>
      </div>
      <div className={classes.item}>
        <Settings className={classes.icon} />
        <Typography className={classes.text}>Settings</Typography>
      </div>
      <div className={classes.item}>
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text}>Logout</Typography>
      </div>
    </Container>
  );
};

export default Leftbar;
