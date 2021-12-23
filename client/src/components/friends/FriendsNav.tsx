import * as React from "react";
import { useDispatch } from "react-redux";
import { Button, Paper, makeStyles, Theme } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { Person, PeopleAlt, PersonAdd } from "@material-ui/icons";
import { getAllUsers } from "../../actions/users";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: "100vh",
  },
  navBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1rem 3rem",
    fontSize: "1rem",
    width: "100%",
  },
  active: {
    backgroundColor: lightGreen[400],
    "&:hover": {
      backgroundColor: lightGreen[300],
    },
  },
}));
const navItems = [
  { name: "following", icon: <Person style={{ fontSize: "2rem" }} /> },
  { name: "followers", icon: <PeopleAlt style={{ fontSize: "2rem" }} /> },
  { name: "find", icon: <PersonAdd style={{ fontSize: "2rem" }} /> },
];
const FriendsNav = (props: any) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const dispatch = useDispatch();

  // everytime the nac changes, make a fetch
  React.useEffect(() => {
    // No user is logged in
    const filterForm = {};
    if (user) {
      filterForm["userId"] = user._id;
    }
    filterForm["selected"] = props.selected;
    dispatch(getAllUsers(filterForm));
    /*  if (!user) {
      props.setLoading(true);
      dispatch(getAllUsers());
    } else {
      props.setLoading(true);
      dispatch(getAllUsers(user?._id, props.selected));
    } */
  }, [props.selected]);
  return (
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
  );
};

export default FriendsNav;
