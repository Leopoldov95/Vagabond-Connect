import {
  makeStyles,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "sticky",

    top: theme.spacing(10),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#500",
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
const Rightbar = (props: any) => {
  const handleClick = (name: String) => {
    props.setFilter(name);
  };
  const handleDelete = () => {
    props.setFilter(null);
  };
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.header}>
        <Typography className={classes.title} gutterBottom>
          Explore
        </Typography>
        {props.filter && (
          <Chip
            label={props.filter}
            onDelete={handleDelete}
            className={classes.chip}
          />
        )}
      </div>

      {continents.map((item) => (
        <Card className={classes.card} onClick={() => handleClick(item.title)}>
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
    </Container>
  );
};

export default Rightbar;