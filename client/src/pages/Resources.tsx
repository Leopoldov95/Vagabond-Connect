import {
  Container,
  Typography,
  makeStyles,
  Theme,
  Grid,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import React from "react";
import { sections, information } from "./resources/resource";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(12),
    maxWidth: 1200,
    margin: "auto",
  },
  gridContainer: {
    paddingTop: theme.spacing(6),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
    },
  },
  section: {
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
  title: {
    textAlign: "center",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  media: {
    height: 160,
  },
  card: {
    maxWidth: 345,
    textAlign: "center",
    margin: "1rem",
    height: 400,
  },
  cardTitle: {
    color: lightGreen[700],
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  text: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down(420)]: {
      fontSize: "14px",
    },
  },
  cardContainer: {
    [theme.breakpoints.down("sm")]: {
      flexBasis: "auto",
      margin: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 !important",
    },
  },
}));
const Resources = () => {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.container}>
        <Typography
          gutterBottom
          variant="h3"
          className={classes.title}
          style={{ textAlign: "center" }}
        >
          Travel Resources
        </Typography>
        <Typography variant="h6" className={classes.text}>
          Trying to select which company to choose to arrange your trip? There
          are certainly tons of companies out there. Some have been excellent,
          while others have been atrocious. The firms listed below are ones I
          return to time and time again. They are exactly the ones I use when I
          schedule my vacation. I believe in them, which is why they are
          mentioned. They are the best around and always have the finest deals.
          Make use of them to plan your vacation!
        </Typography>
        {sections.map((section, index) => (
          <React.Fragment>
            <div className={classes.section} key={index}>
              <Typography className={classes.title} variant="h2">
                {section}
              </Typography>
              <Grid container spacing={4} className={classes.gridContainer}>
                {information[index].map((info?: any) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={info.title}
                    className={classes.cardContainer}
                  >
                    <a
                      className={classes.link}
                      rel="noopener noreferrer"
                      target="_blank"
                      href={info.url}
                    >
                      <Card className={classes.card}>
                        <CardActionArea
                          style={{ height: "100%", flexDirection: "column" }}
                        >
                          <CardMedia
                            className={classes.media}
                            image={`/img/resources/${info.img}`}
                          />
                          <CardContent>
                            <Typography
                              className={classes.cardTitle}
                              gutterBottom
                              variant="h4"
                            >
                              {info.title}
                            </Typography>
                            <Typography variant="body2">
                              {info.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </a>
                  </Grid>
                ))}
              </Grid>
            </div>
            <Divider style={{ backgroundColor: lightGreen[200] }} />
          </React.Fragment>
        ))}
      </Container>
    </div>
  );
};

export default Resources;
