import {
  makeStyles,
  Container,
  Typography,
  Avatar,
  ImageList,
  ImageListItem,
  Link,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";

import { AvatarGroup } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "sticky",
    top: "0",
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
  media: {
    height: 100,
  },
}));
function Rightbar() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography className={classes.title} gutterBottom>
        Explore
      </Typography>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            title="North America"
            image="/img/explore/north_america.jpg"
          />
          <Typography className={classes.link}>North America</Typography>
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            title="South America"
            image="/img/explore/south_america.jpg"
          />
          <Typography className={classes.link}>South America</Typography>
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            title="Europe"
            image="/img/explore/europe.jpg"
          />
          <Typography className={classes.link}>Europe</Typography>
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            title="Africa"
            image="/img/explore/africa.jpg"
          />
          <Typography className={classes.link}>Africa</Typography>
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            title="Asia"
            image="/img/explore/asia.jpg"
          />
          <Typography className={classes.link}>Asia</Typography>
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            title="Oceania"
            image="/img/explore/oceania.jpg"
          />
          <Typography className={classes.link}>Oceania</Typography>
        </CardActionArea>
      </Card>
    </Container>
  );
}

export default Rightbar;
