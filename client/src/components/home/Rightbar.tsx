// This component will FETCH posts based on the continent
// deleting/removing the filter will fetch back to default
import {
  makeStyles,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "sticky",
    top: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#555",
  },
  link: {
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "white",
    fontSize: "22px",
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    transform: "translate(-50%,-50%)",
  },
  card: {
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  chip: {
    backgroundColor: lightGreen[400],
    color: "#333",
  },
  media: {
    height: 100,
  },
  filterOptionsLg: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  filterOptionsSm: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const continents = [
  {
    title: "North America",
    image: "north_america.jpg",
  },
  {
    title: "South America",
    image: "south_america.jpg",
  },
  {
    title: "Africa",
    image: "africa.jpg",
  },
  {
    title: "Europe",
    image: "europe.jpg",
  },
  {
    title: "Asia",
    image: "asia.jpg",
  },
  {
    title: "Oceania",
    image: "oceania.jpg",
  },
];
// at smaller screen size, set this to a dropdown filter menu
const Rightbar = ({ filter, setFilter }) => {
  const handleClick = (name: String) => {
    setFilter(name);
  };
  const handleDelete = () => {
    setFilter("");
  };
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.header}>
        <Typography className={classes.title} gutterBottom>
          Explore
        </Typography>
        {filter && (
          <Chip
            label={filter}
            onDelete={handleDelete}
            className={classes.chip}
          />
        )}
      </div>
      <div className={classes.filterOptionsLg}>
        {continents.map((item) => (
          <Card
            className={classes.card}
            onClick={() => handleClick(item.title)}
            key={item.title}
          >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                title={item.title}
                image={`/img/home/${item.image}`}
              />
              <Typography className={classes.link}>{item.title}</Typography>
            </CardActionArea>
          </Card>
        ))}
      </div>
      <div className={classes.filterOptionsSm}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Continent</InputLabel>
          <Select value={filter} onChange={handleChange} label="Country">
            {continents.map((item) => (
              <MenuItem key={item.title} value={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Container>
  );
};

export default Rightbar;
