import { Button, Paper, makeStyles, Theme } from "@material-ui/core";
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
}));
const FriendsNav = (props: any) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Button
        className={classes.navBtn}
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
        className={classes.navBtn}
        startIcon={<PersonAdd style={{ fontSize: "2rem" }} />}
      >
        {" "}
        Find Users
      </Button>
    </Paper>
  );
};

export default FriendsNav;
