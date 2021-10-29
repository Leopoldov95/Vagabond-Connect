import { ClassNames } from "@emotion/react";
import { Grid, Typography, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
}));
const ProfileBio = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Typography gutterBottom variant="h4" style={{ margin: "auto" }}>
        Giga Chad
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        nobis dicta totam voluptatem ipsum hic error tempore? Incidunt suscipit
        in amet neque dolorem recusandae sunt ipsum, tempora aliquid
        perferendis! Labore. Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Odio dolores magnam quisquam, impedit mollitia tempora
        repellendus, ipsam voluptatibus, praesentium laboriosam perferendis
        itaque! Veritatis deserunt, nobis modi autem voluptatem itaque iusto.
      </Typography>
    </Grid>
  );
};

export default ProfileBio;
