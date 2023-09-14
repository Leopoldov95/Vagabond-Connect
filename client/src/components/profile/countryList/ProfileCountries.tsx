import * as React from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  makeStyles,
  Theme,
  Collapse,
  Tooltip,
  Paper,
  Divider,
  IconButton,
} from "@material-ui/core";
import { Edit, Info, Close, ExpandMore } from "@material-ui/icons";
import CountryList from "./CountryList";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      margin: "0 1rem",
    },
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
  mobileDisplay: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  listLg: {
    display: "block",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  countryHeader: {
    [theme.breakpoints.down(450)]: {
      fontSize: "1.2rem",
    },
  },
}));

// use this component to handle master state changes
const ProfileCountries = () => {
  const user = JSON.parse(
    localStorage.getItem("vagabond_connect_profile")
  )?.result;
  const userProfile = useSelector((state: any) => state.singleUser);
  const authUserUpdate = useSelector((state: any) => state.userAuthReducer);
  const displayUser = Object.keys(userProfile).length > 0 ? userProfile : user;
  const [favorite, setFavorite] = React.useState(
    displayUser?.favoriteCountries
  ); // intially, this will be populated from user data
  const [visited, setVisited] = React.useState(displayUser?.visitedCountries); // intially, this will be populated from user data
  const [isFavoriteEdit, setIsFavoriteEdit] = React.useState(false);
  const [isVisitedEdit, setIsVisitedEdit] = React.useState(false);
  const [expandFav, setExpandFav] = React.useState(false);
  const [expandVisit, setExpandVisit] = React.useState(false);

  const handleFavExpandClick = () => {
    setExpandFav(!expandFav);
  };
  const handleVisitExpandClick = () => {
    setExpandVisit(!expandVisit);
  };
  React.useEffect(() => {
    setVisited(displayUser?.visitedCountries);
    setFavorite(displayUser?.favoriteCountries);
  }, [displayUser]);
  // update the profile page when user
  React.useEffect(() => {
    if (user && user?._id === displayUser?._id) {
      setVisited(user.visitedCountries);
      setFavorite(user.favoriteCountries);
    }
  }, [authUserUpdate]);
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
            <Typography className={classes.countryHeader} variant="h5">
              My Favorite Countries
            </Typography>
            <Tooltip title="Up to 5 favorite countries">
              <Info style={{ marginLeft: 10, color: "999" }} fontSize="small" />
            </Tooltip>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={classes.mobileDisplay}>
              <IconButton
                style={{
                  marginRight: "10px",
                  transform: `${expandFav ? "rotate(180deg)" : ""}`,
                  transition: "all ease 200ms",
                }}
                onClick={handleFavExpandClick}
              >
                <ExpandMore />
              </IconButton>
            </div>
            {user && user._id === displayUser?._id ? (
              <IconButton
                className={classes.editButton}
                onClick={handleFavoritEdit}
                color={isFavoriteEdit ? "default" : "primary"}
              >
                {isFavoriteEdit ? <Close /> : <Edit />}
              </IconButton>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={classes.listContainer}>
          <div className={classes.listLg}>
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
          <div className={classes.mobileDisplay}>
            <Collapse in={expandFav} timeout="auto" unmountOnExit>
              <ul>
                <CountryList
                  name="favorite"
                  countries={favorite}
                  setCountries={setFavorite}
                  isEdit={isFavoriteEdit}
                  setIsEdit={setIsFavoriteEdit}
                />
              </ul>
            </Collapse>
          </div>
        </div>
      </div>
      <Divider style={{ marginBottom: "1rem" }} />
      {/* Visited Countries section */}
      <div>
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            <Typography className={classes.countryHeader} variant="h5">
              Countries I've Visited
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={classes.mobileDisplay}>
              <IconButton
                style={{
                  marginRight: "10px",
                  transform: `${expandVisit ? "rotate(180deg)" : ""}`,
                  transition: "all ease 200ms",
                }}
                onClick={handleVisitExpandClick}
              >
                <ExpandMore />
              </IconButton>
            </div>
            {user && user._id === displayUser?._id ? (
              <IconButton
                className={classes.editButton}
                onClick={handleVisitedEdit}
                color={isFavoriteEdit ? "default" : "primary"}
              >
                {isVisitedEdit ? <Close /> : <Edit />}
              </IconButton>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={classes.listContainer}>
          <div className={classes.listLg}>
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
          <div className={classes.mobileDisplay}>
            <Collapse in={expandVisit} timeout="auto" unmountOnExit>
              <ul>
                <CountryList
                  name="visited"
                  countries={visited}
                  setCountries={setVisited}
                  isEdit={isVisitedEdit}
                  setIsEdit={setIsVisitedEdit}
                />
              </ul>
            </Collapse>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ProfileCountries;
