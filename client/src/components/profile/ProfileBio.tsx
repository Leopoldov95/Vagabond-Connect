import * as React from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Typography,
  makeStyles,
  Theme,
  CircularProgress,
} from "@material-ui/core";
import countries from "../country/countries";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
    textAlign: "center",
    maxWidth: 1280,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
}));

// to display profile owner country info, may want to use data from MongoDB
const ProfileBio = () => {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const userProfile = useSelector((state: any) => state.singleUser);
  const displayUser = Object.keys(userProfile).length > 0 ? userProfile : user;
  /*   React.useEffect(() => {
    console.log(" I am broken but at least i rendered");
  }, [userProfile]); */
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      {displayUser ? (
        <React.Fragment>
          <Typography
            style={{
              margin: "auto",
              color: "#555",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: 20, marginRight: 10 }}
              alt={displayUser?.country}
              src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${displayUser?.country.toLowerCase()}.svg`}
            />
            {`${countries[displayUser?.country].name}, ${
              countries[displayUser?.country].continent
            }`}
          </Typography>
          <Typography variant="h4" style={{ margin: "1rem auto" }}>
            {displayUser?.firstName} {displayUser?.lastName}
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            nobis dicta totam voluptatem ipsum hic error tempore? Incidunt
            suscipit in amet neque dolorem recusandae sunt ipsum, tempora
            aliquid perferendis! Labore. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Odio dolores magnam quisquam, impedit mollitia
            tempora repellendus, ipsam voluptatibus, praesentium laboriosam
            perferendis itaque! Veritatis deserunt, nobis modi autem voluptatem
            itaque iusto.
          </Typography>
        </React.Fragment>
      ) : (
        <div style={{ marginTop: "3rem" }}>
          <CircularProgress size={60} />
        </div>
      )}
    </Grid>
  );
};

export default ProfileBio;
