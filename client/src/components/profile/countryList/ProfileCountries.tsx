import * as React from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  makeStyles,
  Theme,
  Button,
  Tooltip,
  Paper,
} from "@material-ui/core";
import { Edit, Info, Close } from "@material-ui/icons";
import CountryList from "./CountryList";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  secContainer: {
    marginBottom: theme.spacing(3),
  },
  editButton: {
    minWidth: 0,
    width: 40,
  },
  listContainer: {
    marginTop: theme.spacing(2),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
}));

///// IMPORTANT //////
// use this component to handle master state changes
const ProfileCountries = () => {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const userProfile = useSelector((state: any) => state.singleUser);
  const displayUser = Object.keys(userProfile).length > 0 ? userProfile : user;
  const [favorite, setFavorite] = React.useState(displayUser.favoriteCountries); // intially, this will be populated from user data
  const [visited, setVisited] = React.useState(displayUser.visitedCountries); // intially, this will be populated from user data
  const [isFavoriteEdit, setIsFavoriteEdit] = React.useState(false);
  const [isVisitedEdit, setIsVisitedEdit] = React.useState(false);
  const handleFavoritEdit = () => {
    setIsFavoriteEdit(!isFavoriteEdit);
  };
  const handleVisitedEdit = () => {
    setIsVisitedEdit(!isVisitedEdit);
  };
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <div className={classes.secContainer}>
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            <Typography variant="h5">My Favorite Countries</Typography>
            <Tooltip title="Up to 5 favorite countries">
              <Info style={{ marginLeft: 10, color: "999" }} fontSize="small" />
            </Tooltip>
          </div>
          {user && user._id === displayUser?._id ? (
            <Button
              variant="contained"
              className={classes.editButton}
              onClick={handleFavoritEdit}
            >
              {isFavoriteEdit ? <Close /> : <Edit />}
            </Button>
          ) : (
            ""
          )}
        </div>
        <div className={classes.listContainer}>
          <ul>
            <CountryList
              name="favorite"
              countries={favorite}
              setCountries={setFavorite}
              isEdit={isFavoriteEdit}
              setIsEdit={setIsFavoriteEdit}
            />
          </ul>
        </div>
      </div>
      <div>
        <div className={classes.header}>
          <Typography variant="h5">Countries I've Visited</Typography>
          {user && user._id === displayUser?._id ? (
            <Button
              variant="contained"
              className={classes.editButton}
              onClick={handleVisitedEdit}
            >
              {isVisitedEdit ? <Close /> : <Edit />}
            </Button>
          ) : (
            ""
          )}
        </div>
        <div className={classes.listContainer}>
          <ul>
            <CountryList
              name="visited"
              countries={visited}
              setCountries={setVisited}
              isEdit={isVisitedEdit}
              setIsEdit={setIsVisitedEdit}
            />
          </ul>
        </div>
      </div>
    </Paper>
  );
};

export default ProfileCountries;
