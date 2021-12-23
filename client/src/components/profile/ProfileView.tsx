// This component will help un setting and determining how to render a profile if it is set to public or private
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Tab,
  Tabs,
  Box,
  Typography,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { VisibilityOff } from "@material-ui/icons";
import ProfileCountries from "./countryList/ProfileCountries";
import Feed from "../posts/Feed";
import FriendsDisplay from "../friends/FriendsDisplay";
import { useParams } from "react-router";
import { getAllUsers } from "../../actions/users";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 1280,
    margin: "auto",
    marginTop: theme.spacing(4),
  },
  tabContainer: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    justifyContent: "center",
  },
  private: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "gray",
    width: "100%",
    marginBottom: theme.spacing(10),
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

const ProfileView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile")).result
  );
  const USER_API = useSelector((state: any) => state.userAuthReducer);
  const userProfile = useSelector((state: any) => state.singleUser);
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    //console.log(USER_API);
    setUser(USER_API?.authData?.result);
  }, [USER_API]);
  //console.log(userProfile);
  React.useEffect(() => {
    let filterForm = {};
    filterForm["userId"] = id;
    switch (value) {
      case 1:
        filterForm["selected"] = "following";
        dispatch(getAllUsers(filterForm));
        break;
      case 2:
        filterForm["selected"] = "followers";
        dispatch(getAllUsers(filterForm));
        break;
      default:
        return;
    }
  }, [value]);
  return userProfile.privacy === "followers" &&
    !user?.following?.includes(id) ? (
    <div className={classes.private}>
      <Typography
        gutterBottom
        style={{ display: "flex", alignItems: "center" }}
        variant="h3"
      >
        This Profile Is Set To Private{" "}
        <VisibilityOff style={{ marginLeft: 10, fontSize: "3rem" }} />
      </Typography>
      <Typography
        gutterBottom
        variant="body1"
      >{`Please Follow ${userProfile.firstName} ${userProfile.lastName} If You Wish To View Posts`}</Typography>
    </div>
  ) : (
    <React.Fragment>
      <Grid item sm={4} xs={2}>
        <ProfileCountries />
      </Grid>
      <Grid item sm={8} xs={10}>
        <Paper square className={classes.tabContainer}>
          <Tabs
            value={value}
            indicatorColor={"primary"}
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Posts" />
            <Tab label="Following" />
            <Tab label="Followers" />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <Feed />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FriendsDisplay
            loading={loading}
            setLoading={setLoading}
            selected="following"
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FriendsDisplay
            loading={loading}
            setLoading={setLoading}
            selected="followers"
          />
        </TabPanel>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileView;
