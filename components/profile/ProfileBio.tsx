import { Grid, Typography, makeStyles, Theme } from "@material-ui/core";
import countries from "../country/countries";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
    textAlign: "center",
    maxWidth: 1280,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
}));

// to display profile owner country info, may want to use data from MongoDB
const ProfileBio = () => {
  const testUser = "GB";
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Typography
        style={{
          margin: "auto",
          color: "#555",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: 20, marginRight: 10 }}
          alt={countries[testUser].code}
          src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${countries[
            "GB"
          ].code.toLowerCase()}.svg`}
        />
        {`${countries[testUser].name}, ${countries[testUser].continent}`}
      </Typography>
      <Typography variant="h4" style={{ margin: "1rem auto" }}>
        Giga Chad
      </Typography>
      <Typography variant="body1">
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