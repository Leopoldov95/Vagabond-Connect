import {
  Container,
  Typography,
  makeStyles,
  Theme,
  Button,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import allCountries from "../country/allCountries";
import allObjCountries from "../country/countries";
const myCountry = "GB";
//console.log(allObjCountries.keys({ myCountry })[0]);
//console.log(Object.keys(allObjCountries));
console.log(allObjCountries[myCountry]);
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    boxShadow:
      "0px 2px 1px -1px rgb(0, 0, 0, 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    padding: theme.spacing(2),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

// for favorite countries and countries visited, may want to make editable and store in db
// for now we will just use for showcase
const favorite = [2, 90, 65, 90, 100];
const visited = [...favorite, 99, 45, 23];
const ProfileCountries = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div>
        <div className={classes.header}>
          <Typography variant="h5">My Favorite Countries</Typography>
          <Button variant="contained">
            <Edit />
          </Button>
        </div>
        <div>
          <ul>
            {favorite.map((item) => (
              <li>{allCountries[item].name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className={classes.header}>
          <Typography variant="h5">Countries I've Visited</Typography>
          <Button variant="contained">
            <Edit />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ProfileCountries;
