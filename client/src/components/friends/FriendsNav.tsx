import * as React from "react";
import { useDispatch } from "react-redux";
import { Paper, makeStyles, Theme, Tab, Tabs } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { PeopleAlt, Search, SupervisorAccount } from "@material-ui/icons";
import { getAllUsers } from "../../actions/users";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: "auto",
    maxWidth: 1200,
    padding: "5rem 1rem 0 1rem",
    [theme.breakpoints.down(600)]: {
      paddingTop: theme.spacing(9),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
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
  tabContainer: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  mobileMenu: {
    display: "none",
    [theme.breakpoints.down(450)]: {
      display: "block",
      margin: "80px 1rem 0 1rem",
    },
  },
  mobileTab: {
    [theme.breakpoints.down(450)]: {
      fontSize: "12px",
    },
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </div>
  );
}
const FriendsNav = (props: any) => {
  const classes = useStyles();
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("find");
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    props.setSelected(newValue);
  };

  // const handleChange = (event) => {
  //   props.setSelected(event.target.value);
  // };
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
    <div className={classes.container}>
      <Paper>
        <Tabs
          value={value}
          variant="fullWidth"
          indicatorColor={"primary"}
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab
            value="find"
            className={classes.mobileTab}
            icon={<Search className={classes.navIcon} />}
            label="Find"
          />
          <Tab
            value="following"
            className={classes.mobileTab}
            icon={<PeopleAlt className={classes.navIcon} />}
            label="Following"
          />
          <Tab
            value="followers"
            className={classes.mobileTab}
            icon={<SupervisorAccount className={classes.navIcon} />}
            label="Followers"
          />
        </Tabs>
      </Paper>
    </div>
  );
};

export default FriendsNav;
