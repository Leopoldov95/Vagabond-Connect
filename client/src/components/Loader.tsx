import { makeStyles, CircularProgress, Theme } from "@material-ui/core";
// Parent element must have a relative container for this to work!
const useStyles = makeStyles((theme: Theme) => ({
  overlayLoader: {
    position: "absolute",
    left: 0,
    top: 16,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "&::before": {
      content: '""',
      backgroundColor: "white",
      opacity: 0.6,
      height: "100%",
      width: "100%",
    },
  },
}));
const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.overlayLoader}>
      <CircularProgress
        size={60}
        style={{ position: "absolute", zIndex: 10 }}
      />
    </div>
  );
};

export default Loader;
