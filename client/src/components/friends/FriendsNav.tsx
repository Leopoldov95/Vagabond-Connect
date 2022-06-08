import * as React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Paper,
  makeStyles,
  Theme,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { Person, PeopleAlt, PersonAdd, Search } from "@material-ui/icons";
import { getAllUsers } from "../../actions/users";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: "100vh",
    [theme.breakpoints.down(600)]: {
      height: "auto",
      margin: "70px 0.5rem 0 0.5rem",
      display: "flex",
      paddingTop: 0,
    },
    [theme.breakpoints.down(450)]: {
      display: "none",
    },
  },
  navBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1rem 3rem",
    fontSize: "1rem",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 3rem 1rem 10px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
      fontSize: "12px",
    },
  },
  active: {
    backgroundColor: lightGreen[400],
    "&:hover": {
      backgroundColor: lightGreen[300],
    },
  },
  navIcon: {
    fontSize: "2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  mobileMenu: {
    display: "none",
    [theme.breakpoints.down(450)]: {
      display: "block",
      margin: "80px 1rem 0 1rem",
    },
  },
}));

const FriendsNav = (props: any) => {
  const classes = useStyles();
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const dispatch = useDispatch();
  const navItems = [
    { name: "following", icon: <Person className={classes.navIcon} /> },
    { name: "followers", icon: <PeopleAlt className={classes.navIcon} /> },
    { name: "find", icon: <Search className={classes.navIcon} /> },
  ];

  const handleChange = (event) => {
    props.setSelected(event.target.value);
  };
  // everytime the nac changes, make a fetch
  React.useEffect(() => {
    // No user is logged in
    const filterForm = {};
    if (user) {
      filterForm["userId"] = user._id;
    }
    filterForm["selected"] = props.selected;
    dispatch(getAllUsers(filterForm));
  }, [props.selected]);
  return (
    <div>
      <Paper className={classes.container}>
        {navItems.map((item) => (
          <Button
            key={item.name}
            className={`${classes.navBtn} ${
              props.selected === item.name && classes.active
            }`}
            startIcon={item.icon}
            onClick={() => props.setSelected(item.name)}
          >
            {item.name}
          </Button>
        ))}
      </Paper>
      <FormControl className={classes.mobileMenu}>
        <InputLabel>Display</InputLabel>
        <Select value={props.selected} onChange={handleChange}>
          {navItems.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FriendsNav;
