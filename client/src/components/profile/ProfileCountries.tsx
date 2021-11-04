import * as React from "react";
import {
  Container,
  Typography,
  makeStyles,
  Theme,
  Button,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { Edit, Info, Delete } from "@material-ui/icons";
import countries from "../country/countries";
import Favorite from "./countryList/Favorite";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    boxShadow:
      "0px 2px 1px -1px rgb(0, 0, 0, 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    padding: theme.spacing(2),
  },
  editButton: {
    minWidth: 0,
    width: 40,
  },
  listContainer: {
    marginTop: theme.spacing(2),
  },
  list: {
    listStyle: "none",
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    fontSize: 18,
  },
  itemContainer: {
    display: "flex",
    justifyContent: "space-between",
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
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div>
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
            <Edit />
          </Button>
        </div>
        <div className={classes.listContainer}>
          <ul>
            <Favorite favorite={favorite} setFavorite={setFavorite} />
          </ul>
        </div>
      </div>
      <div className={classes.listContainer}>
        <div className={classes.header}>
          <Typography variant="h5">Countries I've Visited</Typography>
          <Button variant="contained" className={classes.editButton}>
            <Edit />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ProfileCountries;
