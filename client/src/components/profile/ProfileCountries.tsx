import * as React from "react";
import {
  Container,
  Typography,
  makeStyles,
  Theme,
  Button,
  Tooltip,
  IconButton,
  Paper,
} from "@material-ui/core";
import { Edit, Info, Delete, Close } from "@material-ui/icons";
import countries from "../country/countries";
import CountryList from "./countryList/CountryList";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    /* boxShadow:
      "0px 2px 1px -1px rgb(0, 0, 0, 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)", */
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

// for favorite countries and countries visited, may want to make editable and store in db
// for now we will just use for showcase
//const favorite = ["GB", "US", "TH", "JP", "NZ"];

///// IMPORTANT //////
// use this component to handle master state changes
const ProfileCountries = () => {
  const [favorite, setFavorite] = React.useState([
    "GB",
    "US",
    "TH",
    "JP",
    "NZ",
  ]);
  const [visited, setVisited] = React.useState([...favorite, "KP", "RU", "ES"]);
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

          <Button
            variant="contained"
            className={classes.editButton}
            onClick={handleFavoritEdit}
          >
            {isFavoriteEdit ? <Close /> : <Edit />}
          </Button>
        </div>
        <div className={classes.listContainer}>
          <ul>
            <CountryList
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
          <Button
            variant="contained"
            className={classes.editButton}
            onClick={handleVisitedEdit}
          >
            <Edit />
          </Button>
        </div>
        <div className={classes.listContainer}>
          <ul>
            <CountryList
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
