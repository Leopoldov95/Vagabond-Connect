import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Grid,
  makeStyles,
  Theme,
  Paper,
  Tab,
  Tabs,
  Box,
  Typography,
} from "@material-ui/core";
import { getUserPosts } from "../actions/posts";
import { getSingleUser, getAllUsers } from "../actions/users";
import { lightGreen } from "@material-ui/core/colors";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileCountries from "../components/profile/countryList/ProfileCountries";
import Feed from "../components/posts/Feed";
import FriendsDisplay from "../components/friends/FriendsDisplay";

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

const Profile = () => {
  // need to overhual this page, need params from url, THEN find a user (may want to use a reducer...), maybe compare current user to url params so no api call needed, from ther users we need (background, profile, country, bio, _id(to fetch their posts), both country lists)
  // will need to take privacy into consideration
  const history = useHistory();
  const dispatch = useDispatch();
  const { id }: any = useParams(); // retrieves user_id from url params
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (id.length !== 24) {
      history.push("/");
    }
    // get the user here
    console.log("new user was chosen");
    dispatch(getSingleUser(id));
    dispatch(getUserPosts(id));
  }, [dispatch, id]);
  // find a better way to handle value
  // nte that logged in user is being filtered out
  React.useEffect(() => {
    switch (value) {
      case 1:
        dispatch(getAllUsers(id, "following"));
        break;
      case 2:
        dispatch(getAllUsers(id, "followers"));
        break;
      default:
        return;
    }
  }, [value]);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <ProfileHeader />
      <ProfileBio />
      <Grid container className={classes.container}>
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
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
