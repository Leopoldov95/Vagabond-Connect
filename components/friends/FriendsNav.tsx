import { Button, Paper, makeStyles, Theme } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { Person, PeopleAlt, PersonAdd } from "@material-ui/icons";

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
  { name: "all", icon: <PersonAdd style={{ fontSize: "2rem" }} /> },
];
const FriendsNav = (props: any) => {
  const classes = useStyles();
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
      {/*   <Button
        className={classes.navBtn}
        id="following"
        startIcon={<Person style={{ fontSize: "2rem" }} />}
      >
        {" "}
        Following
      </Button>
      <Button
        className={classes.navBtn}
        startIcon={<PeopleAlt style={{ fontSize: "2rem" }} />}
      >
        {" "}
        Followers
      </Button>
      <Button
        className={`${classes.navBtn} ${
          props.selected === this?.id && classes.active
        }`}
        id="all"
        startIcon={<PersonAdd style={{ fontSize: "2rem" }} />}
      >
        {" "}
        Find Users
      </Button> */}
    </Paper>
  );
};

export default FriendsNav;
